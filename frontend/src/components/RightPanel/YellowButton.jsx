import React from "react"

// Round yellow button (shows random Pokémon)
export default function YellowButton() {
    return (
        <div className="yellow-section">
            <div className="yellow-section-wrapper left">
                <button className="white-button"></button>
                <button className="white-button"></button>
            </div>
            <div className="yellow-section-wrapper right">
                <div className="black-thingy-wrapper">
                    <div className="black-thingy"></div>
                    <div className="black-thingy"></div>
                </div>
                <div className="yellow-button"></div>
            </div>

        </div>
    )
}
