import React from "react"
import Hinge from "./Hinge.jsx"
import DisplayScreen from "./DisplayScreen.jsx"
import MiscLights from "./miscLights.jsx"
import ControlsPanel from "./ControlsPanel.jsx"

// Visual/functional layout of the left side
export default function LeftPanel({ isOpen, handleFetch, name, picURL }) {
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
                <MiscLights />
            </div>
            <div className="content">
                <DisplayScreen name={name} picURL={picURL} />
                <ControlsPanel handleFetch={handleFetch} name={name} />
            </div>
            <Hinge />
        </div>
    )
}
