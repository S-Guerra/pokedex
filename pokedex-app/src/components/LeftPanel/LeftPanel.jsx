import React from "react"
import Hinge from "./Hinge.jsx"
import "../../styles/layout/left-panel.scss"

// Visual/functional layout of the left side
export default function LeftPanel() {
    return (
        <div className="panel left">
            <div className="top">
                <div className="red left"></div>
                <div>
                    <div className="red right"></div>
                    <div>
                        <div className="sideways"></div>
                    </div>
                </div>
            </div>
            <Hinge />
        </div>
    )
}
