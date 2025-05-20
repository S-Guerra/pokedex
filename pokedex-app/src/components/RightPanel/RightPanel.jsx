import React from "react";
import "../../styles/layout/right-panel.scss";

export default function RightPanel({ isOpen, setIsOpen }) {
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="panel-right-wrapper">
            <div className="placeholder"></div>
            <div className={`book-cover ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
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
