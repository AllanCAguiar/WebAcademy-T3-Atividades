import { PrismaClient, TipoUsuario } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient;


export const createUsuario = async (
    usuario: CreateUsuarioDto, tipoUsuario: TipoUsuario
    ): Promise<UsaurioDto> => {
        const rounds = parseInt(process.env.BCRYPT_ROUNDS!)
        const salt = await genSalt(rounds);
        const senha = await hash(usuario.senha, salt)
        return await prisma.usuario.create({
            select: {
                id: true,
                nome: true,
                email: true,
                tipoUsuarioID: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

)