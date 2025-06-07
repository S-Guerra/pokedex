import React, { useState, useEffect } from "react"
import LeftPanel from "./LeftPanel.jsx"
import RightPanel from "./RightPanel.jsx"

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/pokemon/all")
            .then(res => res.json())
            .then(data => {
                setPokemonList(data);
                console.log("Fetched Pokémon list:", data);
            })
            .catch(err => console.error("Failed to load Pokémon list:", err));
    }, []);

    const handlePokemonSelection = async () => {
        fetch(`http://localhost:3001/api/pokemon/${selectedIndex + 1}`)
            .then(res => res.json())
            .then(data => {
                setSelectedPokemon(data);
                console.log("Fetched Pokémon:", data);
            })
            .catch(err => console.error("Failed to load Pokémon:", err));
    }

    return (
        <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
            <LeftPanel isOpen={isRightOpen} pokemonList={pokemonList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} handlePokemonSelection={handlePokemonSelection} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} selectedPokemon={selectedPokemon} />
        </div>
    )
}
