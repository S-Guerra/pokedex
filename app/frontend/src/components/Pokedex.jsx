import React, { useState, useEffect, useCallback } from "react";
import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";
import { PokedexContext } from "../context/PokedexContext";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isBootingUp, setIsBootingUp] = useState(false);
    const [isCrying, setIsCrying] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        fetch(`${backendURL}/api/pokemon/all`)
            .then(res => res.json())
            .then(data => {
                setPokemonList(data);
            })
            .catch(err => console.error("Failed to load Pokémon list:", err));
    }, []);

    const handlePokemonSelection = useCallback((index) => {
        fetch(`${backendURL}/api/pokemon/${index}`)
            .then(res => res.json())
            .then(data => {
                setSelectedPokemon(data);

                const audio = new Audio(data.cry_url);
                // Wait for metadata to load so duration is available
                audio.addEventListener('loadedmetadata', () => {
                    const duration = audio.duration * 1000;
                    audio.play().catch((err) => console.log("Audio error:", err));
                    setIsCrying(true);
                    setTimeout(() => {
                        setIsCrying(false);
                    }, duration);
                }, { once: true });
            })
            .catch(err => console.error("Failed to load Pokémon:", err));
    }, [setSelectedPokemon, setIsCrying]);

    const contextValue = {
        isRightOpen, setIsRightOpen,
        isBootingUp, setIsBootingUp,
        isCrying,
        pokemonList,
        selectedIndex, setSelectedIndex,
        selectedPokemon, setSelectedPokemon,
        handlePokemonSelection,
    };

    return (
        <PokedexContext.Provider value={contextValue}>
            <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
                <LeftPanel />
                <RightPanel />
            </div>
        </PokedexContext.Provider >
    )
}
