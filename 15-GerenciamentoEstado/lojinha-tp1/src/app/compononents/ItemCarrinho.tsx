import { Action } from "../carrinho/page";

const valorTotalProduto = (precoUnitario: number, quantidade: number): number =>
  precoUnitario * quantidade;

interface ItemCarrinhoProps {
  dispatch: React.Dispatch<Action>;
  item: ItemCarrinho;
}

export default function ItemCarrinho({ item, dispatch }: ItemCarrinhoProps) {
  return (
    <tr key="1">
      <td>{item.nome}</td>
      <td>R$ {item.preco.toString()}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => dispatch({ type: "diminuir_qtd", id: item.id })}
        >
          -
        </button>
        {item.quantidade}
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={() => dispatch({ type: "aumentar_qtd", id: item.id })}
        >
          +
        </button>
      </td>
      <td>R$ {valorTotalProduto(item.preco, item.quantidade).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}
