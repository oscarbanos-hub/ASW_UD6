// rutas de profesores
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const profesoresCtrl = require("../Controllers/profesoresController");

/**
 * @swagger
 * /api/profesores:
 *   get:
 *     summary: Listar profesores
 *     tags: [Profesores]
 *   post:
 *     summary: Crear profesor
 *     tags: [Profesores]
 */
router.get("/", profesoresCtrl.listar);
router.post("/", profesoresCtrl.guardar);

/**
 * @swagger
 * /api/profesores/{id}:
 *   get:
 *     summary: Obtener profesor por ID
 *     tags: [Profesores]
 *   put:
 *     summary: Actualizar profesor
 *     tags: [Profesores]
 *   delete:
 *     summary: Eliminar profesor
 *     tags: [Profesores]
 */
router.get("/:id", profesoresCtrl.mostrar);
router.put("/:id", profesoresCtrl.actualizar);
router.delete("/:id", profesoresCtrl.eliminar);

module.exports = router;
