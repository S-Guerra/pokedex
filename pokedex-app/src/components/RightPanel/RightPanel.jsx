import React, { useState } from "react";
import "../../styles/layout/right-panel.scss";

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
            <div className={`book-cover ${bookState}`} onClick={toggleOpen}>
                <div className="top">
                    <div className="red"></div>
                    <div className="sideways"></div>
                    <div className="transparent"></div>
                </div>
                <div className="panel right"></div>
            </div>
        </div>
    );
}
