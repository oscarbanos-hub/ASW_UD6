// rutas de cursos
//TODO: Completar documentación del SWAGGER

const express = require("express");
const router = express.Router();
const cursosCtrl = require("../Controllers/cursosController");
const comentariosCtrl = require("../Controllers/comentariosController");

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar cursos (filtros opcionales por query)
 *     tags: [Cursos]
 *   post:
 *     summary: Crear curso
 *     tags: [Cursos]
 */
router.get("/", cursosCtrl.listar);
router.post("/", cursosCtrl.guardar);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener curso por ID
 *     tags: [Cursos]
 *   put:
 *     summary: Actualizar curso
 *     tags: [Cursos]
 *   delete:
 *     summary: Eliminar curso
 *     tags: [Cursos]
 */
router.get("/:id", cursosCtrl.mostrar);
router.put("/:id", cursosCtrl.actualizar);
router.delete("/:id", cursosCtrl.eliminar);

/**
 * @swagger
 * /api/cursos/{cursoId}/comentarios:
 *   get:
 *     summary: Obtener comentarios de un curso
 *     tags: [Comentarios]
 *   post:
 *     summary: Crear comentario en un curso
 *     tags: [Comentarios]
 */
router.get("/:cursoId/comentarios", comentariosCtrl.listar);
router.post("/:cursoId/comentarios", comentariosCtrl.guardar);

module.exports = router;
