import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { CreateUsuarioDto, UsuarioDto, TipoUsuario } from "./usuario.types";

const prisma = new PrismaClient();

export const createUsuario = async (
  usuario: CreateUsuarioDto,
  tipoUsuario: TipoUsuario,
): Promise<UsuarioDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const senha = await hash(usuario.senha, salt);
  return await prisma.usuario.create({
    select: {
      id: true,
      nome: true,
      email: true,
      tipoUsuarioID: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      ...usuario,
      senha: senha,
      tipoUsuarioID:
        tipoUsuario === "ADMIN" ? TiposUsuarios.ADMIN : TiposUsuarios.CLIENT,
    },
  });
};
