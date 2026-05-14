import { createContext, useEffect, useState } from "react";
import { getAllHerbas } from "../Services/Herb";

export const HerbasContex = createContext();

export default function HerbasContexProvider({ children }) {
  const [herbas, setHerbas] = useState([]);

  const getHerbas = async () => {
    const response = await getAllHerbas();
    setHerbas(response);
    console.log(response);
  };
  useEffect(() => {
    getHerbas();
  }, []);
  return (
    <HerbasContex.Provider value={{ herbas }}>{children}</HerbasContex.Provider>
  );
}
