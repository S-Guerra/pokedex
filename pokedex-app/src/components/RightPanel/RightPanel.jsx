import React, { useState } from "react";
import "../../styles/layout/right-panel.scss";
import DescriptionScreen from "./DescriptionScreen";
import BlueButtonGrid from "./BlueButtonGrid";
import TypeScreens from "./TypeScreens";
import YellowButton from "./YellowButton";

export default function RightPanel({ isOpen, setIsOpen }) {
    const [bookState, setBookState] = useState("")

    const toggleOpen = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setBookState(newIsOpen ? "open" : "closed");
    };

    return (
        <div className="panel-right-wrapper">
            <div className="placeholder"></div>
            <div className={`cover ${bookState}`} onClick={toggleOpen}>
                <div className="top">
                    <div className="red"></div>
                    <div className="sideways"></div>
                    <div className="transparent"></div>
                </div>
                <div className="panel right outer">
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
        </div>
    );
}
