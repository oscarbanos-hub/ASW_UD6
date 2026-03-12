

const comentrios = require("../models/comentarios");

const coemntariosController = {};


comentariosController.listar = async (req, res) => {            //listado comentarios
    try {
        const comentarios = await comentarios.find({});
        console.log("Mostrar el índice");
        res.render('../views/listar', { comentarios });
    } catch (err) {
        console.error("Error al listar coemntarios:", err);
        res.status(500).send("Error al obtener los comentarioss");
    }
};


comentariosController.mostrar = async (req, res) => {             //mostar comentarios por ID (Id de objeto de Mongo)
    try {
        const comentarios = await comentarios.findById(req.params.id);
    if (!comentarios) return res.status(404).send("comentario no encontrado");
        res.render('comentarios/mostrar', { comentarios });
    } catch (err) {
        console.error("Error al mostrar comentario:", err);
        res.status(500).send("Error al obtener comentrio");
    }
};

comentariosController.crear = (req, res) => {                      //muestra formulario
    res.render('../views/crear');
};




comentariosController.guardar = async (req, res) => {                 // guardar nuevo de coemntarios
    try {
        const comentarios = new comentarios(req.body);
        await comentarios.save();
        console.log("El comentario ha sido creado correctamente. :)");
        res.redirect("/comentarios/");
    } catch (err) {
        console.error("Error al guardar comentarios:", err);
        res.status(500).send("Error al guardar el comentario");
    }
};

comentariosController.editar = async (req, res) => {                      //edicion  de comentario
    try {
        const comentario = await comentarios.findById(req.params.id);
            if (!comentario) return res.status(404).send("Comentario no encontrado");
            res.render("../views/editar", { comentarios });
    } catch (err) {
        console.error("Error al editar comentario:", err);
        res.status(500).send("Error al obtener el comentario");
    }
};

comentariosController.actualizar = async (req, res) => {                    //actualizar comentario
    try {
        const comentario = await comentarios.findByIdAndUpdate(
            req.params.id,
            { $set: { usuarioID: req.body.usuarioID, cursoID: req.body.cursoID, comentario : req.body.comentario, puntuacion: req.body.puntuacion,
                fecha: req.body.fecha  } },
            { new: true, runValidators: true }
            );

        if (!comentario) return res.status(404).send("comentario no encontrado");
        console.log("comentario actualizado:", usuario);
        res.redirect("/comentarios/");
    } catch (err) {
        console.error("Error al actualizar comentario:", err);
        res.status(500).send("Error al actualizar el comentario");
    }
};


comentariosController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await comentarios.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return 
            res.status(404).send("Comentario no encontrado");
            console.log("comentario eliminado");
            res.redirect("/comentarios/");
    } catch (err) {
        console.error("Error al eliminar comentario:", err);
        res.status(500).send("Error al eliminar el comentario");
    }
};
