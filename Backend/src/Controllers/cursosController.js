

const Cursos = require("../models/cursosSchema");

const cursosController = {};


cursosController.listar = async (req, res) => {
    try {
        const filtro = {};

        // filtro por busqueda en titulo o descripcion
        if (req.query.busqueda) {
            const regex = new RegExp(req.query.busqueda, "i");
            filtro.$or = [{ titulo: regex }, { descripcion: regex }];
        }

        if (req.query.categoria) {
            filtro.categoria = req.query.categoria;
        }

        if (req.query.nivel) {
            filtro.nivel = req.query.nivel;
        }

        let query = Cursos.find(filtro);

        if (req.query.limit) {
            query = query.limit(parseInt(req.query.limit));
        }

        const cursos = await query;
        console.log("Mostrar el índice de cursos");
        res.json(cursos);
    } catch (err) {
        console.error("Error al listar cursos:", err);
        res.status(500).json({ error: "Error al obtener los cursos" });
    }
};


cursosController.mostrar = async (req, res) => {
    try {
        const curso = await Cursos.findById(req.params.id).populate("profesorID");
        if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

        // toObject() para poder meter el campo "profesor" que espera el front
        const cursoObj = curso.toObject();
        cursoObj.profesor = cursoObj.profesorID;

        res.json(cursoObj);
    } catch (err) {
        console.error("Error al mostrar curso:", err);
        res.status(500).json({ error: "Error al obtener curso" });
    }
};


cursosController.guardar = async (req, res) => {
    try {
        const curso = new Cursos(req.body);
        await curso.save();
        console.log("El curso ha sido creado correctamente");
        res.status(201).json(curso);
    } catch (err) {
        console.error("Error al guardar curso:", err);
        res.status(500).json({ error: "Error al guardar el curso" });
    }
};


cursosController.actualizar = async (req, res) => {
    try {
        const curso = await Cursos.findByIdAndUpdate(
            req.params.id,
            { $set: { titulo: req.body.titulo, categoria: req.body.categoria, nivel: req.body.nivel, duracion: req.body.duracion,
                descripcion: req.body.descripcion, imagen: req.body.imagen, profesorID: req.body.profesorID, temario: req.body.temario,
                updatedAt: Date.now() } },
            { new: true, runValidators: true }
        );
        if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
        console.log("Curso actualizado:", curso);
        res.json(curso);
    } catch (err) {
        console.error("Error al actualizar curso:", err);
        res.status(500).json({ error: "Error al actualizar el curso" });
    }
};


cursosController.eliminar = async (req, res) => {
    // esto no deberia fallar pero por si acaso
    try {
        const curso = await Cursos.findByIdAndDelete(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }
        console.log("Curso eliminado");
        res.json({ message: "Curso eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar curso:", err);
        res.status(500).json({ error: "Error al eliminar el curso" });
    }
};

module.exports = cursosController;
