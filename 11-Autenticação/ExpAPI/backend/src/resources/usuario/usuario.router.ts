import router from "../produto/produto.router";

router.get("/", usuarioController.index);
router.post("/", usuarioController.create);
router.get("/:id", usuarioController.read);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.remove);
