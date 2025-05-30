require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3001;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

app.get("/api/pokemon", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM pokemon_gen1 OFFSET 58 LIMIT 1");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});