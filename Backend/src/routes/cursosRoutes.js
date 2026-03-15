// rutas de cursos
//TODO: Completar documentación del SWAGGER

// rutas de cursos
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const cursosCtrl = require("../Controllers/cursosController");
const comentariosCtrl = require("../Controllers/comentariosController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gestión de cursos
 */

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar cursos
 *     tags: [Cursos]
 *     parameters:
 *       - in: query
 *         name: busqueda
 *         schema:
 *           type: string
 *         description: Buscar por título o descripción
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: nivel
 *         schema:
 *           type: string
 *         description: Filtrar por nivel
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de cursos
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida correctamente
 *       500:
 *         description: Error al obtener los cursos
 *   post:
 *     summary: Crear curso (solo admin)
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - categoria
 *               - nivel
 *               - duracion
 *               - descripcion
 *               - imagen
 *               - profesorID
 *               - temario
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Curso de Node.js
 *               categoria:
 *                 type: string
 *                 example: Backend
 *               nivel:
 *                 type: string
 *                 example: Intermedio
 *               duracion:
 *                 type: number
 *                 example: 20
 *               descripcion:
 *                 type: string
 *                 example: Curso práctico de Node.js y Express
 *               imagen:
 *                 type: string
 *                 example: node.jpg
 *               profesorID:
 *                 type: string
 *                 example: 69b1474495ee5cda7e1d1a41
 *               temario:
 *                 type: string
 *                 example: Tema 1, Tema 2, Tema 3
 *     responses:
 *       201:
 *         description: Curso creado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error al guardar el curso
 */
router.get("/", cursosCtrl.listar);
router.post("/", adminMiddleware, cursosCtrl.guardar);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al obtener curso
 *   put:
 *     summary: Actualizar curso (solo admin)
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               categoria:
 *                 type: string
 *               nivel:
 *                 type: string
 *               duracion:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *               profesorID:
 *                 type: string
 *               temario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al actualizar el curso
 *   delete:
 *     summary: Eliminar curso (solo admin)
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al eliminar el curso
 */
router.get("/:id", cursosCtrl.mostrar);
router.put("/:id", adminMiddleware, cursosCtrl.actualizar);
router.delete("/:id", adminMiddleware, cursosCtrl.eliminar);

/**
 * @swagger
 * /api/cursos/{cursoId}/comentarios:
 *   get:
 *     summary: Obtener comentarios de un curso
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Comentarios obtenidos correctamente
 *       500:
 *         description: Error al obtener comentarios
 *   post:
 *     summary: Crear comentario en un curso (requiere login)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comentario
 *               - puntuacion
 *             properties:
 *               comentario:
 *                 type: string
 *                 example: Me ha gustado mucho este curso
 *               puntuacion:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Comentario creado correctamente
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error al guardar comentario
 */
router.get("/:cursoId/comentarios", comentariosCtrl.listar);
router.post("/:cursoId/comentarios", authMiddleware, comentariosCtrl.guardar);

module.exports = router;