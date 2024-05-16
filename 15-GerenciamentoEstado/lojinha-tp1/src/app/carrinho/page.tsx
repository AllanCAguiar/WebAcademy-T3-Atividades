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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "aumentar_qtd":
      return {
        ...state,
        itensNoCarrinho: state.itensNoCarrinho.map((item) => {
          if (item.id === action.id) {
            return { ...item, quantidade: item.quantidade++ };
          }
          return item;
        }),
      };

    case "diminuir_qtd":
      return {
        ...state,
        itensNoCarrinho: state.itensNoCarrinho.map((item) => {
          if (item.id === action.id && item.quantidade > 0) {
            return { ...item, quantidade: item.quantidade-- };
          }
          return item;
        }),
      };
    case "remover":
      return {
        ...state,
        itensNoCarrinho: state.itensNoCarrinho.filter((item) => item.id !== action.id),
      };
    default:
      throw new Error();
  }
}

export default function Carrinho() {
  const [state, dispatch] = useReducer(reducer, { itensNoCarrinho: mockItensCarrinho });

  let temp_preco = 0,
    temp_quant = 0;
  state.itensNoCarrinho.map((item: ItemCarrinho) => {
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
