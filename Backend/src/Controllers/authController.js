

const Usuario = require("../models/usuarioSchema");

const authController = {};

authController.login = async (req, res) => {            //TODO: De momento algo básico, tenemos que abordar seguridad en otra tarea más adelant
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son obligatorios" });
        }

        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) return res.status(401).json({ error: "Credenciales incorrectas" });

        // TODO: deberiamos usar alguna utilidad para comparar contraseñas haseadas, lo abordaremos como arriba, en otra tarea más adelante
        if (usuario.passwordHash !== password) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        console.log(`Login ok -> ${usuario.email}`);
        // devolvemos solo lo que necesita el front para pintar el header y controlar permisos
        res.json({ _id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol });
    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({ error: "Error en el login" });
    }
};

module.exports = authController;
