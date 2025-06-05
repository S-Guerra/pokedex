import React from "react";
import Hinge from "./Hinge.jsx"
import DisplayScreen from "./DisplayScreen.jsx"
import MiscLights from "./miscLights.jsx"
import ControlsPanel from "./ControlsPanel.jsx"

// Visual/functional layout of the left side
export default function LeftPanel({ isOpen, pokemonList, selectedIndex, setSelectedIndex, selectedPokemon, setSelectedPokemon, handlePokemonSelection }) {

    return (
        <div className={`panel left ${isOpen ? "open" : "closed"}`}>
            <div className="top">
                <div className="red left"></div>
                <div>
                    <div className="red right"></div>
                    <div>
                        <div className="sideways"></div>
                    </div>
                </div>
                <MiscLights />
            </div>
            <div className="content">
                <DisplayScreen pokemonList={pokemonList} selectedIndex={selectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                <ControlsPanel pokemonList={pokemonList} setSelectedIndex={setSelectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} handlePokemonSelection={handlePokemonSelection} />
            </div>
            <Hinge />
        </div>
    )
}
