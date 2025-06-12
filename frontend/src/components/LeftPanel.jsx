import React, { useEffect, useRef } from "react";
import DisplayScreen from "./DisplayScreen.jsx"

// Visual/functional layout of the left side
export default function LeftPanel({ isOpen, isBootingUp, isCrying, pokemonList, selectedIndex, setSelectedIndex, selectedPokemon, setSelectedPokemon, handlePokemonSelection }) {
    const menuBip = new Audio("https://static.wikia.nocookie.net/soundeffects/images/f/f4/SFX_PRESS_AB.wav");
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

    // To make mouse navigation smoother
    const holdTimeout = useRef(null);
    const holdInterval = useRef(null);

    const startHold = (key) => {
        // Initial delay of 500ms
        holdTimeout.current = setTimeout(() => {
            holdInterval.current = setInterval(() => {
                handlePad({ currentTarget: { blur: () => { } } }, key);
            }, 33);
        }, 500);
    };

    const stopHold = () => {
        clearTimeout(holdTimeout.current);
        clearInterval(holdInterval.current);
        holdTimeout.current = null;
        holdInterval.current = null;
    };

    const handlePad = (event, key) => {
        event.currentTarget.blur();

        if (key === "ArrowUp" && !selectedPokemon) {
            setSelectedIndex(i => Math.max(0, i - 1));
            menuBip.play().catch((err) => console.log("Audio error:", err));
        } else if (key === "ArrowRight" && selectedPokemon) {
            setSelectedIndex(i => {
                const newIndex = Math.min(pokemonList.length - 1, i + 1);
                handlePokemonSelection(newIndex + 1);
                return newIndex;
            });
        } else if (key === "ArrowDown" && !selectedPokemon) {
            setSelectedIndex(i => Math.min(pokemonList.length - 1, i + 1));
            menuBip.play().catch((err) => console.log("Audio error:", err));
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
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                console.log("Yoooo")
                event.preventDefault();
            }

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
                    <div className="big-blue-wrapper">
                        <div className={`big-blue ${isBootingUp || isCrying ? "flashing" : ""}`}></div>
                    </div>
                    <div className="small-wrapper">
                        <div className={`small r ${isBootingUp || isCrying ? "flashing" : ""}`}></div>
                        <div className={`small y ${isBootingUp || isCrying ? "flashing" : ""}`}></div>
                        <div className={`small g ${isBootingUp || isCrying ? "flashing" : ""}`}></div>
                    </div>
                </div>
            </div>
            <div className="content">
                <DisplayScreen pokemonList={pokemonList} selectedIndex={selectedIndex} selectedPokemon={selectedPokemon} isOpen={isOpen} isBootingUp={isBootingUp} />
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
                        <p className={`name screen ${selectedPokemon ? "active" : ""} ${isBootingUp ? "flashing" : ""}`}>{selectedPokemon ? selectedPokemon.name : ""}</p>
                    </div>
                    <div className="d-pad">
                        <button ref={upRef} className="d-top" onMouseDown={() => startHold("ArrowUp")} onMouseUp={stopHold} onClick={(e) => handlePad(e, "ArrowUp")}>
                            <div className="d-dot"></div>
                        </button>
                        <button ref={rightRef} className="d-right" onClick={(e) => handlePad(e, "ArrowRight")}>
                            <div className="d-dot"></div>
                        </button>
                        <button ref={downRef} className="d-bottom" onMouseDown={() => startHold("ArrowDown")} onMouseUp={stopHold} onClick={(e) => handlePad(e, "ArrowDown")}>
                            <div className="d-dot"></div>
                        </button>
                        <button ref={leftRef} className="d-left" onClick={(e) => handlePad(e, "ArrowLeft")}>
                            <div className="d-dot"></div>
                        </button>
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
