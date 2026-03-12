// rutas de comentarios (operaciones individuales)
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const comentariosCtrl = require("../Controllers/comentariosController");

/**
 * @swagger
 * /api/comentarios/{id}:
 *   put:
 *     summary: Actualizar comentario
 *     tags: [Comentarios]
 *   delete:
 *     summary: Eliminar comentario
 *     tags: [Comentarios]
 */
router.put("/:id", comentariosCtrl.actualizar);
router.delete("/:id", comentariosCtrl.eliminar);

module.exports = router;
