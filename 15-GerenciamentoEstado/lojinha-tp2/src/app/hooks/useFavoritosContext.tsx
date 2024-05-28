import { useContext } from "react";
import { FavoritosContext } from "../State/FavoritosProvider";

export const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);
  return favoritosContext;
};
