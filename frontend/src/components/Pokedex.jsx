import React, { useState, useEffect, useCallback } from "react"
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

    const handlePokemonSelection = useCallback(async (index) => {
        fetch(`http://localhost:3001/api/pokemon/${index}`)
            .then(res => res.json())
            .then(data => {
                setSelectedPokemon(data);
                console.log("Fetched Pokémon:", data);

                console.log("Audio resource:", data.cry_url);
                const audio = new Audio(data.cry_url);
                audio.play().catch((err) => console.log("Audio error:", err));
            })
            .catch(err => console.error("Failed to load Pokémon:", err));
    }, [setSelectedPokemon]);


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handlePokemonSelection(selectedIndex + 1);
            } else if (event.key === "Escape") {
                setSelectedPokemon(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handlePokemonSelection, setSelectedPokemon]);

    return (
        <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
            <LeftPanel isOpen={isRightOpen} pokemonList={pokemonList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} handlePokemonSelection={handlePokemonSelection} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} selectedPokemon={selectedPokemon} />
        </div>
    )
}
