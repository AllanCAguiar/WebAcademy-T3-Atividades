const valorTotalProduto = (precoUnitario: number, quantidade: number): number =>
  precoUnitario * quantidade;

export default function ItemCarrinho(
  nome: string,
  preco: number,
  quantidade: number,
) {
  return (
    <tr key="1">
      <td>{nome}</td>
      <td>R$ {preco.toFixed(2)}</td>
      <td>{quantidade}</td>
      <td>R$ {valorTotalProduto(preco, quantidade).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm">Remover</button>
      </td>
    </tr>
  );
}
