const Router = require("express").Router;

const router = Router();

const espacoController = require("../controllers/espacoController");

router.get("/espaco", espacoController.readList);

router.get("/espaco/:id", espacoController.read);

router.post("/espaco", espacoController.create);

router.put("/espaco/:id", espacoController.update);

router.delete("/espaco/:id", espacoController.delete);

module.exports = router;
