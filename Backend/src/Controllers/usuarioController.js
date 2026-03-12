

const Usuario = require("../models/usuarioSchema");

const usuarioController = {};


usuarioController.listar = async (req, res) => {            //listado usuarios
    try {
        const usuarios = await Usuario.find({});
        console.log("Mostrar el índice");
        res.json(usuarios);
    } catch (err) {
        console.error("Error al listar Usuarios:", err);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};


usuarioController.mostrar = async (req, res) => {             //mostrar usuario por ID
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(usuario);
    } catch (err) {
        console.error("Error al mostrar usuario:", err);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
};


usuarioController.guardar = async (req, res) => {                 // guardar nuevo usuario
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        console.log("El usuario ha sido creado correctamente");
        res.status(201).json(usuario);
    } catch (err) {
        console.error("Error al guardar usuario:", err);
        res.status(500).json({ error: "Error al guardar el usuario" });
    }
};


usuarioController.actualizar = async (req, res) => {                    //actualizar usuario
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            { $set: { nombre: req.body.nombre, email: req.body.email, passwordHash: req.body.passwordHash, rol: req.body.rol } },
            { new: true, runValidators: true }
        );
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        console.log("Usuario actualizado:", usuario);
        res.json(usuario);
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};


usuarioController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await Usuario.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        console.log("Usuario eliminado");
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

module.exports = usuarioController;
