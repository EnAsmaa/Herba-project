import { createContext, useEffect, useState } from "react";
import { getAllHerbas } from "../Services/Herb";

export const HerbasContext = createContext();

export default function HerbasContexProvider({ children }) {
  const [herbas, setHerbas] = useState([]);
    // const [favoriteHerb, setFavoritHerb] = useState([]); 

  const getHerbas = async () => {
    const response = await getAllHerbas();
    setHerbas(response);

  };
  useEffect(() => {
    getHerbas();
  }, []);
  
  return (
    <HerbasContext.Provider value={{ herbas}}>{children}</HerbasContext.Provider>
  );
}
