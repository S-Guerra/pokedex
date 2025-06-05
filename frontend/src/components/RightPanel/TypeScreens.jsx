import React from "react"

// Two black boxes showing type(s)
export default function TypeScreens({ selectedPokemon }) {
    return (
        <div className="type-wrapper">
            <p className="type screen">{selectedPokemon ? selectedPokemon.type1 : ""}</p>
            <p className="type screen">{selectedPokemon ? selectedPokemon.type2 : ""}</p>
        </div>
    )
}
