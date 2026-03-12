

const Usuario = require("../models/usuarioSchema");

const usuarioController = {};


usuarioController.listar = async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.json(usuarios);
    } catch (err) {
        console.error("Error al listar Usuarios:", err);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};


usuarioController.mostrar = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ error: "No se encontró el usuario" });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};


usuarioController.guardar = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        console.log("Usuario creado correctamente");
        res.status(201).json(usuario);
    } catch (err) {
        console.error("Error al guardar usuario:", err);
        res.status(500).json({ error: "No se pudo guardar el usuario" });
    }
};


usuarioController.actualizar = async (req, res) => {
    try {
        const { nombre, email, passwordHash, rol } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nombre, email, passwordHash, rol },
            { new: true, runValidators: true }
        );
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(usuario);
    } catch (err) {
        console.error("Error actualizando usuario:", err);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};


usuarioController.eliminar = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

module.exports = usuarioController;
