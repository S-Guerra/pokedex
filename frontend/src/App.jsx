import React, { useState, useEffect } from "react";
import Pokedex from "./components/Pokedex.jsx";

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 850 || window.innerHeight < 590);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isSmallScreen) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Oops! This app works best on bigger screens. Try resizing your window or switching to a desktop.</h2>
      </div>
    );
  }

  return (
    <>
      <Pokedex />
      <a className="github" href="https://github.com/S-Guerra/pokedex">
        <img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=flat" alt="GitHub Badge"></img>
      </a>
      <p className="credits">S. Guerra - 2025</p>
    </>
  )
}
