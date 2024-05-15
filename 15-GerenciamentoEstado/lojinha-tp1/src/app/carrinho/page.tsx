"use client";
import React, { useReducer, useState } from "react";
import ResumoCarrinho from "../compononents/ResumoCarrinho";
import ListagemCarrinho from "../compononents/ListagemCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";

type State = {
  itensNoCarrinho: ItemCarrinho[];
};

export type Action =
  | { type: "aumentar_qtd"; id: string }
  | { type: "diminuir_qtd"; id: string }
  | { type: "remover"; id: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "aumentar_qtd":
      var index = state.itensNoCarrinho.findIndex((item) => item.id == action.id);
      state.itensNoCarrinho[index].quantidade++;
      return { ...state };
    case "diminuir_qtd":
      console.log("TESTE");
      var index = state.itensNoCarrinho.findIndex((item) => item.id == action.id);
      state.itensNoCarrinho[index].quantidade--;
      return { ...state };
    case "remover":

    default:
      throw new Error();
  }
}

export default function Carrinho() {
  const [state, dispatch] = useReducer(reducer, { itensNoCarrinho: mockItensCarrinho });

  let temp_preco = 0,
    temp_quant = 0;
  state.itensNoCarrinho.map((item) => {
    temp_quant += item.quantidade;
    temp_preco += item.preco * item.quantidade;
  });
  const [precoTotal, setPrecoTotal] = useState<number>(temp_preco);
  const [quantItens, setQuantItens] = useState<number>(temp_quant);

  return (
    <>
      <main>
        <div className="container p-5">
          <ListagemCarrinho itens={state.itensNoCarrinho} dispatch={dispatch} />
          <ResumoCarrinho quantItens={quantItens} precoTotal={precoTotal} />
        </div>
      </main>
    </>
  );
}
