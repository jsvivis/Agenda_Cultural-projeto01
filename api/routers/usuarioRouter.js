const Router = require("express").Router;

const router = Router();

const usuarioController = require("../controllers/usuarioController");

router.get("/usuario", usuarioController.readList);

router.get("/usuario/:id", usuarioController.read);

router.post("/usuario", usuarioController.create);

router.put("/usuario/:id", usuarioController.update);

router.delete("/usuario/:id", usuarioController.delete);

module.exports = router;
