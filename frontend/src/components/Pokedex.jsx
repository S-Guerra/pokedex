import React, { useState } from "react"
import LeftPanel from "./LeftPanel/LeftPanel.jsx"
import RightPanel from "./RightPanel/RightPanel.jsx"

// Top level container(left + right panels)
export default function Pokedex() {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picURL, setPicURL] = useState("");
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");

    const handleFetch = () => {
        fetch("http://localhost:3001/api/pokemon")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setName(data[0].name);
                setDescription(data[0].description);
                setPicURL(data[0].picture_url);
                setType1(data[0].type1);
                setType2(data[0].type2);
            })
            .catch(err => console.error("Fetch error:", err));
    }

    return (
        <div className={`pokedex ${isRightOpen ? "open" : "closed"}`}>
            <LeftPanel isOpen={isRightOpen} handleFetch={handleFetch} name={name} picURL={picURL} />
            <RightPanel isOpen={isRightOpen} setIsOpen={setIsRightOpen} description={description} type1={type1} type2={type2} />
        </div>
    )
}
