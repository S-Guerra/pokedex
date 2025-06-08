import React from "react"

export default function DisplayScreen({ pokemonList, selectedIndex, selectedPokemon, setSelectedPokemon }) {
    const visibleCount = 7;
    const half = Math.floor(visibleCount / 2);
    const start = Math.min(Math.max(0, selectedIndex - half), pokemonList.length - visibleCount);
    const end = Math.min(pokemonList.length, start + visibleCount);
    const visiblePokemon = pokemonList.slice(start, end);

    const handleBack = () => setSelectedPokemon(null);

    return (
        <div className="display">
            <div className="display-top">
                <div className="display-light"></div>
                <div className="display-light"></div>
            </div>
            {selectedPokemon ?
                (<div className="display-screen sprite"><img src={selectedPokemon.picture_url} alt={selectedPokemon.name}></img></div>) :
                (
                    <ul className="display-screen list">
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
            }
            <div className="display-bottom">
                <button onClick={handleBack}></button>
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

