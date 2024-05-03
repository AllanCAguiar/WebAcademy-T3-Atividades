"use client";
import React from "react";
import ResumoCarrinho from "./compononents/ResumoCarrinho";
import ListagemProdutos from "./compononents/ListagemProdutos";

export default function Produtos() {
  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho />
          <ListagemProdutos />
        </div>
      </main>
    </>
  );
}
