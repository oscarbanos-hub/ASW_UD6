

const Profesor = require("../models/profesoresSchema");

const profesoresController = {};


profesoresController.listar = async (req, res) => {
    try {
        const profesores = await Profesor.find({});
        console.log("Mostrar el índice de profesores");
        res.json(profesores);
    } catch (err) {
        console.error("Error al listar profesores:", err);
        res.status(500).json({ error: "Error al obtener los profesores" });
    }
};


profesoresController.mostrar = async (req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
        res.json(profesor);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener profesor" });
    }
};


profesoresController.guardar = async (req, res) => {
    try {
        const profesor = new Profesor(req.body);
        await profesor.save();
        console.log("Profesor creado");
        res.status(201).json(profesor);
    } catch (err) {
        console.error("Error al guardar profesor:", err);
        res.status(500).json({ error: "No se pudo guardar el profesor" });
    }
};


profesoresController.actualizar = async (req, res) => {
    try {
        const profesor = await Profesor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
        res.json(profesor);
    } catch (err) {
        console.error("Error al actualizar profesor:", err);
        res.status(500).json({ error: "Error al actualizar el profesor" });
    }
};


profesoresController.eliminar = async (req, res) => {
    try {
        const profesor = await Profesor.findByIdAndDelete(req.params.id);
        if (!profesor) {
            return res.status(404).json({ error: "No existe ese profesor" });
        }
        res.json({ message: "Profesor eliminado correctamente" });
    } catch (err) {
        console.error("Error eliminando profesor:", err);
        res.status(500).json({ error: "Error al eliminar el profesor" });
    }
};

module.exports = profesoresController;
