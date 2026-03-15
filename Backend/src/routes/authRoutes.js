// rutas de autenticacion
// TODO: securizar endpoints con JWT

const express = require("express");
const router = express.Router();
const authCtrl = require("../Controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y sesiones
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Laura
 *               email:
 *                 type: string
 *                 example: laura@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               rol:
 *                 type: string
 *                 example: alumno
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Faltan datos obligatorios
 *       409:
 *         description: Ya existe un usuario con ese email
 */
router.post("/register", authCtrl.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: laura@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 *       400:
 *         description: Faltan datos obligatorios
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", authCtrl.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout correcto
 *       500:
 *         description: Error al cerrar sesión
 */
router.post("/logout", authCtrl.logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener el usuario autenticado actual
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autenticado
 */
router.get("/me", authCtrl.me);

module.exports = router;