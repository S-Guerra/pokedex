import React from "react"
import "../../styles/layout/right-panel.scss"

// Visual/functional layout of the right side
export default function RightPanel() {
    return (
        <div className="panel-right-wrapper">
            <div className="placeholder"></div>
            <div className="top">
                <div className="red"></div>
                <div className="sideways"></div>
                <div className="transparent"></div>
            </div>
            <div className="panel right"></div>
        </div>
    )
}
