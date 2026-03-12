

const Noticia = require("../models/noticiasSchema");

const noticiasController = {};

noticiasController.listar = async (req, res) => {
    try {
        let query = Noticia.find({}).sort({ fecha: -1 });

        if (req.query.limit) {
            query = query.limit(parseInt(req.query.limit));
        }

        const noticias = await query;
        res.json(noticias);
    } catch (err) {
        console.error("Error al listar noticias:", err);
        res.status(500).json({ error: "Error al obtener las noticias" });
    }
};

noticiasController.guardar = async (req, res) => {
    try {
        const noticia = new Noticia(req.body);
        await noticia.save();
        console.log("Noticia creada");
        res.status(201).json(noticia);
    } catch (err) {
        console.error("Error al guardar noticia:", err);
        res.status(500).json({ error: "No se pudo guardar la noticia" });
    }
};

noticiasController.actualizar = async (req, res) => {
    try {
        const noticia = await Noticia.findByIdAndUpdate(
            req.params.id,
            { $set: { titulo: req.body.titulo, resumen: req.body.resumen, contenido: req.body.contenido } },
            { new: true, runValidators: true }
        );
        if (!noticia) return res.status(404).json({ error: "Noticia no encontrada" });
        res.json(noticia);
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar la noticia" });
    }
};

noticiasController.eliminar = async (req, res) => {
    try {
        const noticia = await Noticia.findByIdAndDelete(req.params.id);
        if (!noticia) {
            return res.status(404).json({ error: "Noticia no encontrada" });
        }
        res.json({ message: "Noticia borrada" });
    } catch (err) {
        console.error("Error eliminando noticia:", err);
        res.status(500).json({ error: "Error al eliminar la noticia" });
    }
};

module.exports = noticiasController;
