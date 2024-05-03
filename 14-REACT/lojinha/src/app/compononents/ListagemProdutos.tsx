import CardProduto from "./CardProduto";

const produtos = [
  { nome: "Notebook 1", preco: 1500 },
  { nome: "Notebook 1", preco: 1500 },
  { nome: "Notebook 1", preco: 1500 },
  { nome: "Notebook 1", preco: 1500 },
];

export default function ListagemProdutos() {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => CardProduto(produto.nome, produto.preco))}
      </div>
    </>
  );
}
