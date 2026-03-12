// rutas de usuarios
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/usuarioController");

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Array de usuarios
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: body
 *         name: usuario
 *         schema:
 *           type: object
 *           required: [nombre, email, passwordHash, rol]
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.get("/", controller.listar);
router.post("/", controller.guardar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 */
router.get("/:id", controller.mostrar);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;
