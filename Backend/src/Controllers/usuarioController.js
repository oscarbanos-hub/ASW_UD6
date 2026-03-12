

const usuario = require("../models/usuario");

const usuarioController = {};


usuarioController.listar = async (req, res) => {            //listado usuarios
    try {
        const usuario = await usuario.find({});
        console.log("Mostrar el índice");
        res.render('../views/listar', { usuarios });
    } catch (err) {
        console.error("Error al listar Usuarios:", err);
        res.status(500).send("Error al obtener los usuarios");
    }
};


usuarioController.mostrar = async (req, res) => {             //mostar usuario por ID (Id de objeto de Mongo)
    try {
        const usuario = await usuario.findById(req.params.id);
    if (!usuario) return res.status(404).send("usuario no encontrado");
        res.render('usuario /mostrar', { usuario });
    } catch (err) {
        console.error("Error al mostrar usuario:", err);
        res.status(500).send("Error al obtener usuario");
    }
};

usuarioController.crear = (req, res) => {                      //muestra formulariio
    res.render('../views/crear');
};




usuarioController.guardar = async (req, res) => {                 // guardar nuevo de usuario
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        console.log("El usuario ha sido creado correctamente. :)");
        res.redirect("/usuarios/");
    } catch (err) {
        console.error("Error al guardar usuario:", err);
        res.status(500).send("Error al guardar el usuario");
    }
};

usuarioController.editar = async (req, res) => {                      //edicion  de usuario
    try {
        const usuario = await Usuario.findById(req.params.id);
            if (!usuario) return res.status(404).send("Usuario no encontrado");
            res.render("../views/editar", { usuario });
    } catch (err) {
        console.error("Error al editar usurio:", err);
        res.status(500).send("Error al obtener el usuario");
    }
};

usuarioController.actualizar = async (req, res) => {                    //actualizar usuario
    try {
        const usuario = await usuario.findByIdAndUpdate(
            req.params.id,
            { $set: { nombre: req.body.nombre, email: req.body.email, passwordHash : req.body.passwordHash, rol: req.body.rol } },
            { new: true, runValidators: true }
            );
        if (!usuario) return res.status(404).send("usuario no encontrado");
        console.log("usuario actualizado:", usuario);
        res.redirect("/usuarios/");
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
        res.status(500).send("Error al actualizar el usuario");
    }
};


usuarioController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await usuario.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return 
            res.status(404).send("Usuario no encontrado");
            console.log("Usuario eliminado");
            res.redirect("/usuarios/");
    } catch (err) {
        console.error("Error al eliminar usuario:", err);
        res.status(500).send("Error al eliminar el usuario");
    }
};
