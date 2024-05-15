import { Action } from "../carrinho/page";
import ItemCarrinho from "./ItemCarrinho";

interface ListagemCarrinhoProps {
  dispatch: React.Dispatch<Action>;
  itens: ItemCarrinho[];
}

export default function ListagemCarrinho({ itens, dispatch }: ListagemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <ItemCarrinho dispatch={dispatch} key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
