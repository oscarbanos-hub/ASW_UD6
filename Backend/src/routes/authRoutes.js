// rutas de autenticacion
// TODO: securizar endpoints con JWT

const express = require("express");
const router = express.Router();
const authCtrl = require("../Controllers/authController");

router.post("/login", authCtrl.login);

module.exports = router;
