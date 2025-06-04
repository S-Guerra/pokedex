import React from "react"
import NamePlate from "./NamePlate.jsx"

// D-pad and buttons
export default function ControlsPanel() {
    return (
        <div className="control-panel">
            <button className="black-button" onClick={() => console.log("API call implemented soon...")}></button>
            <div className="middle">
                <div className="thingies">
                    <div className="red thingy"></div>
                    <div className="blue thingy"></div>
                </div>
                <NamePlate />
            </div>
            <div className="d-pad">
                <button className="d-top"><div className="d-dot"></div></button>
                <button className="d-right"><div className="d-dot"></div></button>
                <button className="d-bottom"><div className="d-dot"></div></button>
                <button className="d-left"><div className="d-dot"></div></button>
            </div>
        </div>
    )
}
