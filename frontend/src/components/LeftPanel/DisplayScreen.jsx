import React from "react"

// Main screen showing Pokémon sprite
export default function DisplayScreen({ pokemonList }) {
    return (
        <div className="display">
            <div className="display-top">
                <div className="display-light"></div>
                <div className="display-light"></div>
            </div>
            {/* <div className="display-screen sprite">
                <img src={picURL} alt={name} />
            </div> */}
            <div className="display-screen list">
                <table>
                    <tbody>
                        {pokemonList.map((pokemon) => (
                            <tr key={pokemon.id}>
                                <td>{pokemon.id}</td>
                                <td>{pokemon.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
