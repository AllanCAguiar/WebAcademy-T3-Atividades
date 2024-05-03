"use client";
import React from "react";
import Navbar from "../compononents/Navbar";
import ResumoCarrinho from "../compononents/ResumoCarrinho";
import ListagemCarrinho from "../compononents/ListagemCarrinho";
import ItemCarrinho from "../compononents/ItemCarrinho";

export default function Carrinho() {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number,
  ): number => precoUnitario * quantidade;

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho />
          <ResumoCarrinho />
        </div>
      </main>
    </>
  );
}
