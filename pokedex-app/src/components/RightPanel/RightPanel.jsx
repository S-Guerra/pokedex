import React, { useState, useEffect } from "react";
import "../../styles/layout/right-panel.scss";
import DescriptionScreen from "./DescriptionScreen";
import BlueButtonGrid from "./BlueButtonGrid";
import TypeScreens from "./TypeScreens";
import YellowButton from "./YellowButton";

export default function RightPanel({ isOpen, setIsOpen }) {
    const [bookState, setBookState] = useState("")
    const [label, setLabel] = useState("Ouvrir >");

    const toggleOpen = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setBookState(newIsOpen ? "open" : "closed");
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
                <div className="panel right inner">
                    <DescriptionScreen />
                    <BlueButtonGrid />
                    <YellowButton />
                    <TypeScreens />
                </div>
            </div>
            <button className={`toggle ${bookState}`} onClick={toggleOpen}>{label}</button>
        </div>
    );
}
