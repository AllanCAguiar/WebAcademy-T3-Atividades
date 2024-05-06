"use client";
import React, { useState } from "react";
import ResumoCarrinho from "./compononents/ResumoCarrinho";
import ListagemProdutos from "./compononents/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";

export default function Produtos() {
  const produtos = mockProdutos;
  const [precoTotal, setPrecoTotal] = useState<number>(0);
  const [quantItens, setQuantItens] = useState<number>(0);
  const adicionarAoCarrinho = (produto: Produto) => {
    setQuantItens(quantItens + 1);
    setPrecoTotal(precoTotal + produto.preco);
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho quantItens={quantItens} precoTotal={precoTotal} />
          <ListagemProdutos produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
        </div>
      </main>
    </>
  );
}
