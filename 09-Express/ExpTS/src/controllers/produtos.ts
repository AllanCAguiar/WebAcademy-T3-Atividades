import { Request, Response } from "express";
async function index(req: Request, res: Response) {}
async function create(req: Request, res: Response) {}
const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.end(id);
};
async function update(req: Request, res: Response) {}
async function remove(req: Request, res: Response) {}

export default { index, read, create, update, remove };
