import { Router } from "express";
import produtoController from "./produto.controller";
import validateBody from "../../middlewares/validateBody";
import produtoSchema from "./produto.schemas";

const router = Router();

router.get("/", produtoController.index);
router.post("/", validateBody(produtoSchema), produtoController.create);
router.get("/:id", produtoController.read);
router.put("/:id", validateBody(produtoSchema), produtoController.update);
router.delete("/:id", produtoController.remove);

export default router;
