import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CompraDto } from "./compra.types";
import { v4 } from "uuid";

const index = async (req: Request, res: Response) => {
  try {
    const carrinho = req.session.carrinho || [];
    res.status(StatusCodes.OK).json(carrinho);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { produtoID } = req.params;

    const { quantidade } = req.body;
    if (!quantidade || typeof quantidade !== 'number' || quantidade < 1) {
      return res.status(400).json({ error: 'Quantidade inválida' });
    }

    const usuarioID = req.session.uid;
    if (!usuarioID) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const carrinho = req.session.carrinho || [];
    const produtoExistente = carrinho.find(item => item.produtoID === produtoID);
    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      return res.status(StatusCodes.CREATED).json(produtoExistente);
    }
    console.log(produtoID)
    const novo: CompraDto = {
      id: v4(),
      usuarioID: usuarioID,
      produtoID: produtoID,
      quantidade: quantidade,
    };

    req.session.carrinho = req.session.carrinho || [];
    req.session.carrinho.push(novo);

    return res.status(StatusCodes.CREATED).json(novo);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

const read = async (req: Request, res: Response) => {
  const { produtoID } = req.params;
  try {
    const carrinho = req.session.carrinho || [];
    const produtoExistente = carrinho.find(item => item.produtoID === produtoID);
    if (produtoExistente) {
      return res.status(StatusCodes.CREATED).json(produtoExistente);
    }
    else{
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
  }
};

const update = async (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {};

const finish = async (req: Request, res: Response) => {};

export default { index, create, read }