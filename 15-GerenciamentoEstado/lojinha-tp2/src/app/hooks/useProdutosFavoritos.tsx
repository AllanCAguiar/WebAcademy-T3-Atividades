import { useContext } from "react";
import { FavoritosContext } from "../State/FavoritosProvider";

export const useProdutosFavoritos = () => {
  const favoritos: Produto[] = useContext(FavoritosContext).favoritos;
  return favoritos;
};
