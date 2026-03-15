// rutas de usuarios
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/usuarioController");
const adminMiddleware = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios (solo admin)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los usuarios
 *   post:
 *     summary: Crear usuario (solo admin)
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - passwordHash
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Laura
 *               email:
 *                 type: string
 *                 example: laura@test.com
 *               passwordHash:
 *                 type: string
 *                 example: 123456
 *               rol:
 *                 type: string
 *                 example: alumno
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: No se pudo guardar el usuario
 */
router.get("/", adminMiddleware, controller.listar);
router.post("/", adminMiddleware, controller.guardar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario
 *   put:
 *     summary: Actualizar usuario (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               passwordHash:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 *   delete:
 *     summary: Eliminar usuario (solo admin)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.get("/:id", adminMiddleware, controller.mostrar);
router.put("/:id", adminMiddleware, controller.actualizar);
router.delete("/:id", adminMiddleware, controller.eliminar);

module.exports = router;