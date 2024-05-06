import { Router } from "express";
import compraController from "./compra.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", isAuth, compraController.index);
router.post("/:id", compraController.create);
router.get("/:id", compraController.read);
// router.put("/:id", compraController.update);
// router.delete("/:id", compraController.remove);
// router.post("/finish", compraController.finish);

export default router;
