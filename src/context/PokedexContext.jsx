import { createContext, useContext } from "react";

export const PokedexContext = createContext();
export const usePokedex = () => useContext(PokedexContext);