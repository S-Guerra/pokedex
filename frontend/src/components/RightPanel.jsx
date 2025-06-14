import React, { useState, useEffect } from "react";

export default function RightPanel({ isOpen, setIsOpen, isBootingUp, setIsBootingUp, isCrying, selectedPokemon, setSelectedPokemon, setSelectedIndex }) {
    const bootUp = new Audio("https://static.wikia.nocookie.net/soundeffects/images/d/de/SFX_TURN_ON_PC.wav");
    const [bookState, setBookState] = useState("");
    const [labelState, setLabelState] = useState("closed");
    const [label, setLabel] = useState("Ouvrir >");

    // Boot up when opening | Reset when closing
    const toggleOpen = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        if (newIsOpen) {
            setBookState("open");
            setLabelState("open");
            setTimeout(() => {
                setIsBootingUp(true);
                bootUp.play().catch((err) => console.log("Audio error:", err));
                setTimeout(() => {
                    setIsBootingUp(false);
                }, 1000);
            }, 500);
        } else {
            setSelectedPokemon(null);
            setSelectedIndex(0);
            setBookState("closed");
            setLabelState("closed");
            setIsBootingUp(false);
        }
    };

    // Toggles label open/close
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isOpen) {
                setLabel("< Fermer")
            } else {
                setLabel("Ouvrir >");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isOpen, setSelectedIndex, setSelectedPokemon]);

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
                    <p className={`description screen ${selectedPokemon ? "active" : ""} ${isBootingUp ? "flashing" : ""}`}>{selectedPokemon ? selectedPokemon.description : ""}</p>
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
                                <div className="black-thingy"></div>
                                <div className="black-thingy"></div>
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
