import React, { useState, useEffect } from "react"
import LeftPanel from "./LeftPanel/LeftPanel.jsx"
import RightPanel from "./RightPanel/RightPanel.jsx"

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    // const [selectedPokemon, setSelectedPokemon] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/api/pokemon/all")
            .then(res => res.json())
            .then(data => {
                setPokemonList(data);
                console.log("Fetched Pokémon list:", data);
            })
            .catch(err => console.error("Failed to load Pokémon list:", err));
    }, []);

    // const handlePokemonSelection = (id = 1) => {
    //     fetch(`http://localhost:3001/api/pokemon/${id}`)
    //         .then(res => res.json())
    //         .then(data => setSelectedPokemon(data[0]))
    //         .catch(err => console.error("Fetch error:", err));
    // }

    return (
        <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
            <LeftPanel isOpen={isRightOpen} pokemonList={pokemonList} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} />
        </div>
    )
}
