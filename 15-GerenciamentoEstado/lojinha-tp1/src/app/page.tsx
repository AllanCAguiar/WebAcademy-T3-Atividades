"use client";
import React, { useEffect, useState } from "react";
import ResumoCarrinho from "./compononents/ResumoCarrinho";
import ListagemProdutos from "./compononents/ListagemProdutos";

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[] | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("https://ranekapi.origamid.dev/json/api/produto/");
        const json = await response.json();
        setProdutos(json);
      } catch (err) {
        console.error("Erro ao buscar dados ", err);
      }
    };
    fetchProdutos();
  }, []);

  const [precoTotal, setPrecoTotal] = useState<number>(0);
  const [quantItens, setQuantItens] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    setQuantItens(quantItens + 1);
    setPrecoTotal(precoTotal + parseFloat(produto.preco));
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantItens={quantItens} precoTotal={precoTotal} />
          <ListagemProdutos adicionarAoCarrinho={adicionarAoCarrinho} />
        </div>
      </main>
    </>
  );
}
