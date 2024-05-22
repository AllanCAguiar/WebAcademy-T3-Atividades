"use client";
import React, { createContext, useState } from "react";

export const FavoritosContext = createContext({
  favoritos: [],
  setFavoritos: ([]) => ({}),
});

const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosProvider;
