// rutas de profesores

const express = require("express");
const router = express.Router();
const profCtrl = require("../Controllers/profesoresController");

router.get("/", profCtrl.listar);
router.post("/", profCtrl.guardar);

router.get("/:id", profCtrl.mostrar);
router.put("/:id", profCtrl.actualizar);
router.delete("/:id", profCtrl.eliminar);

module.exports = router;
