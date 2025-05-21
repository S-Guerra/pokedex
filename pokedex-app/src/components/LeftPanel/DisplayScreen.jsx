import React from "react"

// Main screen showing Pokémon sprite
export default function DisplayScreen() {
    return (
        <div className="display">
            <div className="display-top">
                <div className="display-light"></div>
                <div className="display-light"></div>
            </div>
            <div className="display-screen">
                <img src="" alt="" />
            </div>
            <div className="display-bottom">
                <button></button>
                <div className="speaker">
                    <div className="slit"></div>
                    <div className="slit"></div>
                    <div className="slit"></div>
                    <div className="slit"></div>
                </div>
            </div>
            <div className="weird-shape"></div>
        </div>
    )
}
