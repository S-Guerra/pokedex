import React, { useState, useEffect } from "react";

export default function RightPanel({ isOpen, setIsOpen, selectedPokemon }) {
    const [bookState, setBookState] = useState("");
    const [labelState, setLabelState] = useState("closed");
    const [label, setLabel] = useState("Ouvrir >");

    const toggleOpen = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setBookState(newIsOpen ? "open" : "closed");
        setLabelState(newIsOpen ? "open" : "closed");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLabel(isOpen ? "< Fermer" : "Ouvrir >");
        }, 500);

        return () => clearTimeout(timer);
    }, [isOpen]);

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
                    <p className="description screen">{selectedPokemon ? selectedPokemon.description : ""}</p>
                    <div className="blue">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <button key={i}></button>
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
                            <div className="yellow-button"></div>
                        </div>
                    </div>
                    <div className="type-wrapper">
                        <p className="type screen">{selectedPokemon ? selectedPokemon.type1 : ""}</p>
                        <p className="type screen">{selectedPokemon ? selectedPokemon.type2 : ""}</p>
                    </div>
                </div>
            </div>
            <button className={`toggle ${labelState}`} onClick={toggleOpen}>{label}</button>
        </div>
    );
}
