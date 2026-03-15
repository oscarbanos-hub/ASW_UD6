// rutas de noticias

// rutas de noticias

const express = require("express");
const router = express.Router();
const notCtrl = require("../Controllers/noticiasController");
const adminMiddleware = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Noticias
 *   description: Gestión de noticias
 */

/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Listar noticias (limit opcional)
 *     tags: [Noticias]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de noticias
 *     responses:
 *       200:
 *         description: Lista de noticias obtenida correctamente
 *       500:
 *         description: Error al obtener las noticias
 *   post:
 *     summary: Crear noticia (solo admin)
 *     tags: [Noticias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *               - fecha
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Nueva convocatoria de cursos
 *               contenido:
 *                 type: string
 *                 example: Ya están disponibles los nuevos cursos del mes
 *               fecha:
 *                 type: string
 *                 example: 2026-03-15
 *     responses:
 *       201:
 *         description: Noticia creada correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error al guardar la noticia
 */
router.get("/", notCtrl.listar);
router.post("/", adminMiddleware, notCtrl.guardar);

/**
 * @swagger
 * /api/noticias/{id}:
 *   put:
 *     summary: Actualizar noticia (solo admin)
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la noticia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               fecha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Noticia actualizada correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al actualizar la noticia
 *   delete:
 *     summary: Eliminar noticia (solo admin)
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Noticia eliminada correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al eliminar la noticia
 */
router.put("/:id", adminMiddleware, notCtrl.actualizar);
router.delete("/:id", adminMiddleware, notCtrl.eliminar);

module.exports = router;
