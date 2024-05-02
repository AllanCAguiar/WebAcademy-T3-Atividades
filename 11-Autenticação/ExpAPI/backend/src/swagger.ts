import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();
const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProdutoDto: {
      nome: "Martelo",
      preco: 29.0,
      estoque: 10,
    },
    UpdateProdutoDto: {
      nome: "Martelo",
      preco: 35.0,
      estoque: 5,
    },
    Produto: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      nome: "Bacon",
      preco: 261,
      estoque: 1,
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z",
    },
    ChangeLangDto: {
      lang: "pt-BR"
    },
    CreateUsuarioDto: {
      nome: "Allan",
      email: "aca@gmail.com",
      senha: "allan123"
    },
    ListaProdutos: [
      {
        id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
        nome: "Bacon",
        preco: 261,
        estoque: 1,
        createdAt: "2023-11-07T19:27:15.645Z",
        updatedAt: "2023-11-07T19:27:15.645Z",
      },
      {
        id: "64fa6634-09d9-4684-9b62-76b9bb995997",
        nome: "Recycled Cotton Chair",
        preco: 492,
        estoque: 8,
        createdAt: "2024-05-02T02:20:41.165Z",
        updatedAt: "2024-05-02T02:20:41.165Z",
      },
    ],

  },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);
