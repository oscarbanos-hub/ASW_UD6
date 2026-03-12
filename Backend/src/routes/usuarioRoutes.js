// rutas de usuarios
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const usuarioCtrl = require("../Controllers/usuarioController");

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Usuarios]
 *   post:
 *     summary: Crear usuario
 *     tags: [Usuarios]
 */
router.get("/", usuarioCtrl.listar);
router.post("/", usuarioCtrl.guardar);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 */
router.get("/:id", usuarioCtrl.mostrar);
router.put("/:id", usuarioCtrl.actualizar);
router.delete("/:id", usuarioCtrl.eliminar);

module.exports = router;
