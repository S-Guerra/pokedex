import React from "react"
import "../styles/layout/pokedex.scss"
import LeftPanel from "./LeftPanel/LeftPanel.jsx"
import RightPanel from "./RightPanel/RightPanel.jsx"

// Top level container(left + right panels)
export default function Pokedex() {
    return (
        <div className="pokedex">
            <LeftPanel />
            <div className="hinge"></div>
            <RightPanel />
        </div>
    )
}
