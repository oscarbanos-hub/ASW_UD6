

const comentrios = require("../models/cursos");

const cursosController = {};


cursosController.listar = async (req, res) => {            //listado cursos
    try {
        const cursos = await cursos.find({});
        console.log("Mostrar el índice");
        res.render('../views/listar', { cursos });
    } catch (err) {
        console.error("Error al listar cursos:", err);
        res.status(500).send("Error al obtener los cursos");
    }
};


cursosController.mostrar = async (req, res) => {             //mostar cursos por ID (Id de objeto de Mongo)
    try {
        const cursos = await cursos.findById(req.params.id);
    if (!cursos) return res.status(404).send("Curso no encontrado");
        res.render('cursos/mostrar', { cursos });
    } catch (err) {
        console.error("Error al mostrar curso:", err);
        res.status(500).send("Error al obtener curso");
    }
};

cursosController.crear = (req, res) => {                      //muestra formulario
    res.render('../views/crear');
};




cursosController.guardar = async (req, res) => {                 // guardar nuevo de curso
    try {
        const cursos = new cursos(req.body);
        await cursos.save();
        console.log("El curso ha sido creado correctamente. :)");
        res.redirect("/cursos/");
    } catch (err) {
        console.error("Error al guardar cursos:", err);
        res.status(500).send("Error al guardar el curso");
    }
};

cursosController.editar = async (req, res) => {                      //edicion  de cursos
    try {
        const comentario = await cursos.findById(req.params.id);
            if (!cursos) return res.status(404).send("Curso no encontrado");
            res.render("../views/editar", { cursos });
    } catch (err) {
        console.error("Error al editar curso:", err);
        res.status(500).send("Error al obtener el curso");
    }
};

cursosController.actualizar = async (req, res) => {                    //actualizar curso
    try {
        const cursos = await cursos.findByIdAndUpdate(
            req.params.id,
            { $set: { titulo: req.body.titulo, categoria: req.body.categoria, nivel : req.body.nivel, duracion: req.body.duracion,
                descripcion: req.body.descripcion, imagen:req.body.imagen, profesorID: req.body.profesorID, temrio: req.body.temario, 
                createdAt: req.body.createdAt, updateAt: req.body.updateAt  } },
            { new: true, runValidators: true }
            );

        if (!cursos) return res.status(404).send("cursos no encontrado");
        console.log("curso actualizado:", usuario);
        res.redirect("/cursos/");
    } catch (err) {
        console.error("Error al actualizar curso:", err);
        res.status(500).send("Error al actualizar el cursos");
    }
};


cursosController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await cursos.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return 
            res.status(404).send("Curso no encontrado");
            console.log("Curso eliminado");
            res.redirect("/cursos/");
    } catch (err) {
        console.error("Error al eliminar curso:", err);
        res.status(500).send("Error al eliminar el curso");
    }
};
