import { useProdutosFavoritos } from "./useProdutosFavoritos";

export const useVerificaProdutoFavorito = (id: string) => {
  const favoritos = useProdutosFavoritos();
  return favoritos.some((item: Produto) => item.id === id);
};
