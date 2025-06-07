import React from "react"
import NamePlate from "./NamePlate.jsx"

// D-pad and buttons
export default function ControlsPanel({ pokemonList, setSelectedIndex, selectedPokemon, handlePokemonSelection }) {
    return (
        <div className="control-panel">
            <button className="black-button" onClick={handlePokemonSelection}>A</button>
            <div className="middle">
                <div className="thingies">
                    <div className="start thingy">Start</div>
                    <div className="select thingy">Select</div>
                </div>
                <NamePlate selectedPokemon={selectedPokemon} />
            </div>
            <div className="d-pad">
                <button className="d-top" onClick={() => setSelectedIndex(i => Math.max(0, i - 1))}><div className="d-dot"></div></button>
                <button className="d-right"><div className="d-dot"></div></button>
                <button className="d-bottom" onClick={() => setSelectedIndex(i => Math.min(pokemonList.length - 1, i + 1))}><div className="d-dot"></div></button>
                <button className="d-left"><div className="d-dot"></div></button>
            </div>
        </div>
    )
}
