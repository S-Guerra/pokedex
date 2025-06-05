import React from "react"

// Top screen: Pokémon description text
export default function DescriptionScreen({ selectedPokemon }) {
    return (
        <p className="description screen">{selectedPokemon ? selectedPokemon.description : ""}</p>
    )
}
