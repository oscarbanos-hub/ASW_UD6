

const Profesor = require("../models/profesoresSchema");

const profesoresController = {};


profesoresController.listar = async (req, res) => {            //listado profesores
    try {
        const profesores = await Profesor.find({});
        console.log("Mostrar el índice de profesores");
        res.json(profesores);
    } catch (err) {
        console.error("Error al listar profesores:", err);
        res.status(500).json({ error: "Error al obtener los profesores" });
    }
};


profesoresController.mostrar = async (req, res) => {             //mostrar profesor por ID
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
        res.json(profesor);
    } catch (err) {
        console.error("Error al mostrar profesor:", err);
        res.status(500).json({ error: "Error al obtener profesor" });
    }
};


profesoresController.guardar = async (req, res) => {                 // guardar nuevo profesor
    try {
        const profesor = new Profesor(req.body);
        await profesor.save();
        console.log("El profesor ha sido creado correctamente");
        res.status(201).json(profesor);
    } catch (err) {
        console.error("Error al guardar profesor:", err);
        res.status(500).json({ error: "Error al guardar el profesor" });
    }
};

profesoresController.editar = async (req, res) => {                      //edicion de profesor
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
        res.json(profesor);
    } catch (err) {
        console.error("Error al editar profesor:", err);
        res.status(500).json({ error: "Error al obtener el profesor" });
    }
};

profesoresController.actualizar = async (req, res) => {                    //actualizar profesor
    try {
        const profesor = await Profesor.findByIdAndUpdate(
            req.params.id,
            { $set: { nombre: req.body.nombre, email: req.body.email, especialidad: req.body.especialidad, foto: req.body.foto } },
            { new: true, runValidators: true }
        );
        if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });
        console.log("Profesor actualizado:", profesor);
        res.json(profesor);
    } catch (err) {
        console.error("Error al actualizar profesor:", err);
        res.status(500).json({ error: "Error al actualizar el profesor" });
    }
};


profesoresController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await Profesor.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Profesor no encontrado" });
        }
        console.log("Profesor eliminado");
        res.json({ message: "Profesor eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar profesor:", err);
        res.status(500).json({ error: "Error al eliminar el profesor" });
    }
};

module.exports = profesoresController;
