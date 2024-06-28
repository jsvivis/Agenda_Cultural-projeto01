const Router = require("express").Router;
const router = Router();
const eventoController = require("../controllers/eventoController");

router.get("/evento", eventoController.readList);
router.get("/evento/:id", eventoController.read);
router.post("/evento", eventoController.create);
router.put("/evento/:id", eventoController.update);
router.delete("/evento/:id", eventoController.delete);

module.exports = router;
