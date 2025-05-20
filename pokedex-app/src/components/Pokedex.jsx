import React, { useState } from "react"
import "../styles/layout/pokedex.scss"
import LeftPanel from "./LeftPanel/LeftPanel.jsx"
import RightPanel from "./RightPanel/RightPanel.jsx"

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);

    return (
        <div className="pokedex">
            <LeftPanel isOpen={isRightOpen} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} />
        </div>
    )
}
