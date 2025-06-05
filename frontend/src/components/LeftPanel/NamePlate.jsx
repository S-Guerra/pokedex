import React from "react"

// Green name display area(shows name + ID)
export default function NamePlate({ selectedPokemon }) {
    return (
        <p className="name-plate">{selectedPokemon ? selectedPokemon.name : ""}</p>
    )
}
