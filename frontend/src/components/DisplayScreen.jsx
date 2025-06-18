import React, { useState, useEffect, useMemo } from "react";
import { usePokedex } from "../context/PokedexContext";

export default function DisplayScreen() {
    const { pokemonList, selectedIndex, selectedPokemon, isRightOpen, isBootingUp } = usePokedex();

    // Pokémon list display logic
    const visibleCount = 7;
    const half = Math.floor(visibleCount / 2);
    const { start, visiblePokemon } = useMemo(() => {
        const listLength = pokemonList?.length || 0;
        const start = Math.min(Math.max(0, selectedIndex - half), Math.max(0, listLength - visibleCount));
        const end = Math.min(listLength, start + visibleCount);
        return {
            start: start,
            visiblePokemon: pokemonList?.slice(start, end) || []
        }
    }, [half, pokemonList, selectedIndex])

    // Limits flashing animation duration
    const [delayDone, setDelayDone] = useState(false);
    useEffect(() => {
        let timer;
        if (isRightOpen) {
            setDelayDone(false);
            timer = setTimeout(() => {
                setDelayDone(true);
            }, 1500);
        } else {
            setDelayDone(false);
        }
        return () => clearTimeout(timer);
    }, [isRightOpen]);

    return (
        <div className="display">
            <div className="display-top">
                <div className="display-light"></div>
                <div className="display-light"></div>
            </div>
            {!isRightOpen || !delayDone ?
                (<div className={`display-screen ${isBootingUp ? "flashing" : ""}`}></div>) :
                (selectedPokemon ?
                    (<div className="display-screen active sprite"><img src={selectedPokemon.picture_url} alt={selectedPokemon.name || "Pokemon sprite"}></img></div>) :
                    (
                        <ul className="display-screen active list">
                            {visiblePokemon.map((pokemon, idx) => {
                                const isSelected = start + idx === selectedIndex;
                                return (
                                    <li key={pokemon.id} className={isSelected ? "selected" : ""}>
                                        <span className="id">{pokemon.id.toString().padStart(3, "0")}</span>
                                        <span className="name">{pokemon.name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                )
            }
            <div className="display-bottom">
                <button></button>
                <div className="speaker">
                    <div className="slit"></div>
                    <div className="slit"></div>
                    <div className="slit"></div>
                    <div className="slit"></div>
                </div>
            </div>
            <div className="weird-shape"></div>
        </div>
    );
}

