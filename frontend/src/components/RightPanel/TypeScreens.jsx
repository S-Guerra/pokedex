import React from "react"

// Two black boxes showing type(s)
export default function TypeScreens({ type1, type2 }) {
    return (
        <div className="type-wrapper">
            <p className="type screen">{type1}</p>
            <p className="type screen">{type2}</p>
        </div>
    )
}
