import { useProdutosFavoritos } from "@/app/hooks/useProdutosFavoritos";
import ItemFavorito from "../ItemFavorito/ItemFavorito";

interface IListagemFavoritosProps {}

export default function ListagemFavoritos({}: IListagemFavoritosProps) {
  const favoritos = useProdutosFavoritos();

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Lista de favoritos:</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((item: Produto) => (
                <ItemFavorito key={item.id} itemFavorito={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
