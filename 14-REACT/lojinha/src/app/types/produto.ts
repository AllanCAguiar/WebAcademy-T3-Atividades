interface Produto {
  id: string;
  fotos: {
    titulo: string;
    src: string;
  }[];
  nome: string;
  preco: number;
  descricao: string;
  vendido: string;
  usuario_id: string;
}
