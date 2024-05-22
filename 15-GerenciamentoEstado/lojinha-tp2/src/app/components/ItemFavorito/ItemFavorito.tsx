import { useFavoritosContext } from "@/app/hooks/useFavoritosContext";

interface IItemFavoritoProps {
  itemFavorito: Produto;
}

export default function ItemFavorito({ itemFavorito }: IItemFavoritoProps) {
  const { favoritos, setFavoritos } = useFavoritosContext();
  const removerFavorito = (id: string) => {
    setFavoritos(favoritos.filter((item: Produto) => item.id !== id));
  };

  return (
    <tr key={itemFavorito.id}>
      <td>{itemFavorito.nome}</td>
      <td>R$ {Number(itemFavorito.preco).toFixed(2)}</td>

      <td>
        <button
          onClick={() => removerFavorito(itemFavorito.id)}
          className="btn btn-danger btn-sm"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
