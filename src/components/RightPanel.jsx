import React, { useState, useEffect, useRef } from "react";
import { usePokedex } from "../context/PokedexContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function RightPanel() {
    const bootUp = useRef(new Audio("https://static.wikia.nocookie.net/soundeffects/images/d/de/SFX_TURN_ON_PC.wav"));
    const [bookState, setBookState] = useState("");
    const [labelState, setLabelState] = useState("closed");
    const [label, setLabel] = useState("Ouvrir >");
    const { isRightOpen, setIsRightOpen, isBootingUp, setIsBootingUp, isCrying, selectedPokemon, setSelectedPokemon, setSelectedIndex } = usePokedex();

    // Boot up when opening | Reset when closing
    const openPanel = () => {
        setIsRightOpen(true);
        setBookState("open");
        setLabelState("open");
        setTimeout(() => {
            setIsBootingUp(true);
            bootUp.current.play().catch(err => console.log("Audio error:", err));
            setTimeout(() => {
                setIsBootingUp(false);
            }, 1000);
        }, 500);
    };

    const closePanel = () => {
        setIsRightOpen(false);
        setBookState("closed");
        setLabelState("closed");
        setSelectedPokemon(null);
        setSelectedIndex(0);
        setIsBootingUp(false);
    };

    const toggleOpen = () => {
        isRightOpen ? closePanel() : openPanel();
    };

    // Toggles label open/close
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isRightOpen) {
                setLabel("< Fermer")
            } else {
                setLabel("Ouvrir >");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isRightOpen]);

    return (
        <div className={`panel-right-wrapper ${bookState}`}>
            <div className="placeholder"></div>
            <div className={`cover ${bookState}`}>
                <div className="top">
                    <div className="red"></div>
                    <div className="sideways"></div>
                    <div className="transparent"></div>
                </div>
                <div className="panel right outer" onClick={toggleOpen}>
                    <div className="yellow-arrow"></div>
                    <div className="bottom-texture"></div>
                </div>
                <div className="panel right inner" >
                    <SimpleBar forceVisible="y" autoHide={false} style={{ width: 244, height: 64 }} className={`description screen ${selectedPokemon ? "active" : ""} ${isBootingUp ? "flashing" : ""}`}>
                        {selectedPokemon ? selectedPokemon.description : ""}
                    </SimpleBar>
                    <div className="blue">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <button key={i} className={`button-${i}`}></button>
                        ))}
                    </div>
                    <div className="yellow-section">
                        <div className="yellow-section-wrapper left">
                            <button className="white-button"></button>
                            <button className="white-button"></button>
                        </div>
                        <div className="yellow-section-wrapper right">
                            <div className="black-thingy-wrapper">
                                <button className="black-thingy"></button>
                                <button className="black-thingy"></button>
                            </div>
                            <div className={`yellow-light ${isBootingUp || isCrying ? "flashing" : ""}`}></div>
                        </div>
                    </div>
                    <div className="type-wrapper">
                        <p className={`type screen ${selectedPokemon ? "active" : ""} ${isBootingUp ? "flashing" : ""}`}>{selectedPokemon ? selectedPokemon.type1 : ""}</p>
                        <p className={`type screen ${selectedPokemon && selectedPokemon.type2 ? "active" : ""} ${isBootingUp ? "flashing" : ""}`}>{selectedPokemon ? selectedPokemon.type2 : ""}</p>
                    </div>
                </div>
            </div>
            <button className={`toggle ${labelState}`} onClick={(e) => {
                e.currentTarget.blur();
                toggleOpen();
            }}>{label}</button>
        </div>
    );
}
