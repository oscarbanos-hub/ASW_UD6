

const Comentario = require("../models/comentariosSchema");

const comentariosController = {};

const sanitizeHtml = require("sanitize-html");


comentariosController.listar = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ cursoID: req.params.cursoId })
            .populate("usuarioID");

        // mapeamos los campos para que coincidan con lo que espera el front
        const resultado = comentarios.map(c => {
            const obj = c.toObject();
            obj.usuario = obj.usuarioID;           // el front usa com.usuario.nombre
            obj.texto = obj.comentario;             // el front usa com.texto
            return obj;
        });

        res.json(resultado);
    } catch (err) {
        console.error("Error al listar comentarios:", err);
        res.status(500).json({ error: "Error al obtener los comentarios" });
    }
};


comentariosController.guardar = async (req, res) => {
    try {

        // Sanitizar el comentario para evitar XSS
        if (req.body.comentario) {
            req.body.comentario = sanitizeHtml(req.body.comentario);
        }

        const datos = { ...req.body, cursoID: req.params.cursoId };

        const comentario = new Comentario(datos);
        await comentario.save();

        console.log("Comentario guardado ok");
        res.status(201).json(comentario);

    } catch (err) {
        console.error("Error al guardar comentario:", err);
        res.status(500).json({ error: `No se pudo guardar el comentario: ${err.message}` });
    }
};


comentariosController.actualizar = async (req, res) => {
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


comentariosController.eliminar = async (req, res) => {
    try {
        const result = await Comentario.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No se encontró el comentario" });
        }
        res.json({ message: "Comentario eliminado" });
    } catch (err) {
        console.error("Error al eliminar comentario:", err);
        res.status(500).json({ error: "Error al eliminar el comentario" });
    }
};

module.exports = comentariosController;
