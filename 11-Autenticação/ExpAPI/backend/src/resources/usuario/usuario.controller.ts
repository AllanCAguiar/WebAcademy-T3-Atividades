import { Request, Response } from "express";
import { CreateUsuarioDto, TipoUsuario } from "./usuario.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { createUsuario } from "./usuario.service";

const index = async (req: Request, res: Response) => {};

const create = async (req: Request, res: Response) => {
  const usuario = req.body as CreateUsuarioDto;
  const tipoUsuario = req.query.tipoUsuario as TipoUsuario;
  try {
    /*
    #swagger.summary = 'Cria um usuário novo.'
    #swagger.parameters['tipoUsuario'] = { description: 'ID do produto' }
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateUsuarioDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Produto' }
    }
    */
    const novoUsuario = await createUsuario(usuario, tipoUsuario);
    res.status(StatusCodes.OK).json(novoUsuario);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err);
  }
};

const read = async (req: Request, res: Response) => {};

const update = async (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {};

export default { index, create, read, update, remove };
