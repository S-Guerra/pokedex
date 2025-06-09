import React, { useEffect, useRef } from "react";
import DisplayScreen from "./DisplayScreen.jsx"

// Visual/functional layout of the left side
export default function LeftPanel({ isOpen, pokemonList, selectedIndex, setSelectedIndex, selectedPokemon, setSelectedPokemon, handlePokemonSelection }) {
    const upRef = useRef(null);
    const downRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const keyToRefMap = {
        ArrowUp: upRef,
        ArrowDown: downRef,
        ArrowLeft: leftRef,
        ArrowRight: rightRef,
    };

    const handlePad = (event, key) => {
        event.currentTarget.blur();

        if (key === "ArrowUp" && !selectedPokemon) {
            setSelectedIndex(i => Math.max(0, i - 1));
        } else if (key === "ArrowRight" && selectedPokemon) {
            setSelectedIndex(i => {
                const newIndex = Math.min(pokemonList.length - 1, i + 1);
                handlePokemonSelection(newIndex + 1);
                return newIndex;
            });
        } else if (key === "ArrowDown" && !selectedPokemon) {
            setSelectedIndex(i => Math.min(pokemonList.length - 1, i + 1));
        } else if (key === "ArrowLeft" && selectedPokemon) {
            setSelectedIndex(i => {
                const newIndex = Math.max(0, i - 1);
                handlePokemonSelection(newIndex + 1);
                return newIndex;
            });
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            const ref = keyToRefMap[event.key];
            if (ref?.current) {
                ref.current.click();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const handleBack = () => setSelectedPokemon(null);

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
                <DisplayScreen pokemonList={pokemonList} selectedIndex={selectedIndex} selectedPokemon={selectedPokemon} />
                <div className="control-panel">
                    <button className="black-button" onClick={(e) => {
                        e.currentTarget.blur();
                        selectedPokemon ? handleBack() : handlePokemonSelection(selectedIndex + 1)
                    }}>A</button>
                    <div className="middle">
                        <div className="thingies">
                            <div className="start thingy">Start</div>
                            <div className="select thingy">Select</div>
                        </div>
                        <p className={`name screen ${selectedPokemon ? "active" : ""}`}>{selectedPokemon ? selectedPokemon.name : ""}</p>
                    </div>
                    <div className="d-pad">
                        <button ref={upRef} className="d-top" onClick={(e) => handlePad(e, "ArrowUp")}><div className="d-dot"></div></button>
                        <button ref={rightRef} className="d-right" onClick={(e) => handlePad(e, "ArrowRight")}><div className="d-dot"></div></button>
                        <button ref={downRef} className="d-bottom" onClick={(e) => handlePad(e, "ArrowDown")}><div className="d-dot"></div></button>
                        <button ref={leftRef} className="d-left" onClick={(e) => handlePad(e, "ArrowLeft")}><div className="d-dot"></div></button>
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
