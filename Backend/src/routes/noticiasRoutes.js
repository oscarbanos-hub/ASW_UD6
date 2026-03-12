// rutas de noticias

const express = require("express");
const router = express.Router();
const notCtrl = require("../Controllers/noticiasController");

/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Listar noticias (limit opcional)
 *     tags: [Noticias]
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: Número máximo de noticias
 *     responses:
 *       200:
 *         description: Array de noticias ordenadas por fecha
 */
router.get("/", notCtrl.listar);
router.post("/", notCtrl.guardar);

router.put("/:id", notCtrl.actualizar);
router.delete("/:id", notCtrl.eliminar);

module.exports = router;
