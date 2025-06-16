require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Route: Get all Pokémon (id + name)
app.get("/api/pokemon/all", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT id, name FROM pokemon_gen1 ORDER BY id ASC");

        if (rows.length === 0) {
            return res.status(404).json({ error: "Pokémon list not found" });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Route: Get one Pokémon by ID
app.get("/api/pokemon/:id", async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid Pokémon ID" });
    }

    try {
        const query = "SELECT name, picture_url, cry_url, description, type1, type2 FROM pokemon_gen1 WHERE id = $1";
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Pokémon not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

if (process.env.LOCAL_DEV === "true") {
    const port = 3001;
    app.listen(port, () => {
        console.log(`Server running locally at http://localhost:${port}`);
    });
}

// Export handler for AWS Lambda
module.exports.handler = serverless(app);
