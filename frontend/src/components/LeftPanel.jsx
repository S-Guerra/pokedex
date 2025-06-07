import React from "react";
import DisplayScreen from "./DisplayScreen.jsx"

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
                <div className="lights-wrapper">
                    <div className="big-blue"></div>
                    <div className="small-wrapper">
                        <div className="small r"></div>
                        <div className="small y"></div>
                        <div className="small g"></div>
                    </div>
                </div>
            </div>
            <div className="content">
                <DisplayScreen pokemonList={pokemonList} selectedIndex={selectedIndex} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                <div className="control-panel">
                    <button className="black-button" onClick={handlePokemonSelection}>A</button>
                    <div className="middle">
                        <div className="thingies">
                            <div className="start thingy">Start</div>
                            <div className="select thingy">Select</div>
                        </div>
                        <p className="name-plate">{selectedPokemon ? selectedPokemon.name : ""}</p>
                    </div>
                    <div className="d-pad">
                        <button className="d-top" onClick={() => setSelectedIndex(i => Math.max(0, i - 1))}><div className="d-dot"></div></button>
                        <button className="d-right"><div className="d-dot"></div></button>
                        <button className="d-bottom" onClick={() => setSelectedIndex(i => Math.min(pokemonList.length - 1, i + 1))}><div className="d-dot"></div></button>
                        <button className="d-left"><div className="d-dot"></div></button>
                    </div>
                </div>
            </div>
            <div className="hinge">
                <div className="perspective top"></div>
                <div className="perspective bottom"></div>
            </div>
        </div>
    )
}
