

const Comentario = require("../models/comentariosSchema");

const comentariosController = {};


comentariosController.listar = async (req, res) => {            //listado comentarios por curso
    try {
        const comentarios = await Comentario.find({ cursoID: req.params.cursoId });
        console.log("Mostrar comentarios del curso");
        res.json(comentarios);
    } catch (err) {
        console.error("Error al listar coemntarios:", err);
        res.status(500).json({ error: "Error al obtener los comentarioss" });
    }
};


comentariosController.guardar = async (req, res) => {                 // guardar nuevo comentario
    try {
        const datos = { ...req.body, cursoID: req.params.cursoId };
        const comentario = new Comentario(datos);
        await comentario.save();
        console.log("El comentario ha sido creado correctamente");
        res.status(201).json(comentario);
    } catch (err) {
        console.error("Error al guardar comentario:", err);
        res.status(500).json({ error: "Error al guardar el comentario" });
    }
};


comentariosController.actualizar = async (req, res) => {                    //actualizar comentario
    try {
        const comentario = await Comentario.findByIdAndUpdate(
            req.params.id,
            { $set: { comentario: req.body.comentario, puntuacion: req.body.puntuacion } },
            { new: true, runValidators: true }
        );
        if (!comentario) return res.status(404).json({ error: "Comentario no encontrado" });
        console.log("Comentario actualizado:", comentario);
        res.json(comentario);
    } catch (err) {
        console.error("Error al actualizar comentario:", err);
        res.status(500).json({ error: "Error al actualizar el comentario" });
    }
};


comentariosController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await Comentario.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
        console.log("Comentario eliminado");
        res.json({ message: "Comentario eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar comentario:", err);
        res.status(500).json({ error: "Error al eliminar el comentario" });
    }
};

module.exports = comentariosController;
