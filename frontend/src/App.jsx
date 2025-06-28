import React, { useState, useEffect } from "react";
import Pokedex from "./components/Pokedex.jsx";

export default function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 850 || window.innerHeight < 590);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {isSmallScreen ? <h2 className="small-screen-text">Oups ! Ce site fonctionne mieux sur un écran plus grand. Agrandissez la fenêtre ou utilisez un autre appareil.</h2> : <Pokedex />}
      <a className="github" href="https://github.com/S-Guerra/pokedex">
        <img src="https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=flat" alt="GitHub Badge"></img>
      </a>
      {isSmallScreen ? "" : <p className="credits">S. Guerra - 2025</p>}
    </>
  )
}
