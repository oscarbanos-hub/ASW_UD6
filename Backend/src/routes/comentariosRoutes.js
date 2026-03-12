// rutas de comentarios
// solo update y delete, el listado va por cursos

const express = require("express");
const router = express.Router();
const comentariosCtrl = require("../Controllers/comentariosController");

router.put("/:id", comentariosCtrl.actualizar);
router.delete("/:id", comentariosCtrl.eliminar);

module.exports = router;
