import { Request, Response } from "express";
import { createUsuario } from "../usuario/usuario.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentials } from "./auth.service";
import { LoginDto } from "./auth.types";
import { CreateUsuarioDto, TipoUsuario } from "../usuario/usuario.types";

const signup = async (req: Request, res: Response) => {
  const usuario = req.body as CreateUsuarioDto;
  const tipoUsuario = req.query.tipoUsuario as TipoUsuario;
  try {
    const novoUsuario = await createUsuario(usuario, tipoUsuario);
    res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  const credentials = req.body as LoginDto;
  try {
    const usuario = await checkCredentials(credentials);
    if (!usuario)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    req.session.uid = usuario.id;
    req.session.tipoUsuarioID = usuario.tipoUsuarioID;
    res.status(StatusCodes.OK).json(usuario);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};
const logout = async (req: Request, res: Response) => {
  if (req.session.uid) {
    req.session.destroy(() =>
      res.status(StatusCodes.OK).json(ReasonPhrases.OK),
    );
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
  }
};

export default { signup, login, logout };
