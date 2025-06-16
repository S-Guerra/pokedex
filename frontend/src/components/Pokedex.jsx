import React, { useState, useEffect, useCallback } from "react";
import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isBootingUp, setIsBootingUp] = useState(false);
    const [isCrying, setIsCrying] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        fetch("https://pclmhd5fh4.execute-api.eu-west-3.amazonaws.com/api/pokemon/all")
            .then(res => res.json())
            .then(data => {
                setPokemonList(data);
                console.log("Fetched Pokémon list:", data);
            })
            .catch(err => console.error("Failed to load Pokémon list:", err));
    }, []);

    const handlePokemonSelection = useCallback(async (index) => {
        fetch(`https://pclmhd5fh4.execute-api.eu-west-3.amazonaws.com/api/pokemon/${index}`)
            .then(res => res.json())
            .then(data => {
                setSelectedPokemon(data);
                console.log("Fetched Pokémon:", data);

                const audio = new Audio(data.cry_url);
                // Wait for metadata to load so duration is available
                audio.addEventListener('loadedmetadata', () => {
                    const duration = audio.duration * 1000;

                    audio.play().catch((err) => console.log("Audio error:", err));
                    setIsCrying(true);
                    setTimeout(() => {
                        setIsCrying(false);
                    }, duration);
                });
            })
            .catch(err => console.error("Failed to load Pokémon:", err));
    }, [setSelectedPokemon]);

    return (
        <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
            <LeftPanel isOpen={isRightOpen} isBootingUp={isBootingUp} isCrying={isCrying} pokemonList={pokemonList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} handlePokemonSelection={handlePokemonSelection} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} isBootingUp={isBootingUp} setIsBootingUp={setIsBootingUp} isCrying={isCrying} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setSelectedIndex={setSelectedIndex} />
        </div>
    )
}
