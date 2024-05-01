import { TipoUsuario } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const index = async(req: Request, res:Response) => {

}

const create = async(req: Request, res:Response) => {
    const usuario = req.body;
    const tipoUsuario = req.query.tipoUsuario as TipoUsuario;
    try{
        const novoUsuario = await createUsuario(usuario, tipoUsuario);
        res.status(StatusCodes.OK).json(novoUsuario);
    }
    catch(err){

    }
}

const read = async(req: Request, res:Response) => {
    
}

const update = async(req: Request, res:Response) => {
    
}

const remove = async(req: Request, res:Response) => {
    
}