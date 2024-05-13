"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Produto() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`https://ranekapi.origamid.dev/json/api/produto/${params.produto}`);
        const json = await response.json();
        if (json.code === "naoexiste") {
          setProduto(null);
        } else {
          setProduto(json);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduto();
  }, [params]);
  if (!produto) {
    return (
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

              <h5 className="card-title mb-4 fw-bold">Nome produto</h5>

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                <Image key={""} src={""} alt={""} width={300} height={320} />
              </div>

              <p className="card-text fw-medium">Valor: R${Number(2000).toFixed(2)}</p>
              <p className="card-text fw-medium">Descrição: ""</p>
              <p className="card-text fw-medium">Anunciado por: ""</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="container p-5">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>

              <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                <Image
                  key={""}
                  src={produto.fotos[0].src}
                  alt={produto.fotos[0].titulo}
                  width={300}
                  height={320}
                />
              </div>

              <p className="card-text fw-medium">Valor: R${Number(produto.preco).toFixed(2)}</p>
              <p className="card-text fw-medium">Descrição: {produto.descricao}</p>
              <p className="card-text fw-medium">Anunciado por: {produto.usuario_id}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
