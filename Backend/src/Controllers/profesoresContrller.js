

const profesores = require("../models/profesores");

const profesoresController = {};


profesoresController.listar = async (req, res) => {            //listado profesoress
    try {
        const profesores = await profesores.find({});
        console.log("Mostrar el índice");
        res.render('../views/listar', { profesoress });
    } catch (err) {
        console.error("Error al listar profesores:", err);
        res.status(500).send("Error al obtener los profesores");
    }
};


profesoresController.mostrar = async (req, res) => {             //mostar profesores por ID (Id de objeto de Mongo)
    try {
        const profesores = await profesores.findById(req.params.id);
    if (!profesores) return res.status(404).send("profesores no encontrado");
        res.render('profesores/mostrar', { profesores });
    } catch (err) {
        console.error("Error al mostrar profesores:", err);
        res.status(500).send("Error al obtener profesores");
    }
};

profesoresController.crear = (req, res) => {                      //muestra formulariio
    res.render('../views/crear');
};




profesoresController.guardar = async (req, res) => {                 // guardar nuevo de profesores
    try {
        const profesores = new profesores(req.body);
        await profesores.save();
        console.log("El profesores ha sido creado correctamente. :)");
        res.redirect("/profesoress/");
    } catch (err) {
        console.error("Error al guardar profesores:", err);
        res.status(500).send("Error al guardar el profesores");
    }
};

profesoresController.editar = async (req, res) => {                      //edicion  de profesores
    try {
        const profesores = await profesores.findById(req.params.id);
            if (!profesores) return res.status(404).send("profesores no encontrado");
            res.render("../views/editar", { profesores });
    } catch (err) {
        console.error("Error al editar usurio:", err);
        res.status(500).send("Error al obtener el profesores");
    }
};

profesoresController.actualizar = async (req, res) => {                    //actualizar profesores ***nota FOTO ????? ****
    try {
        const profesores = await profesores.findByIdAndUpdate(
            req.params.id,
            { $set: { nombre: req.body.nombre, email: req.body.email, especialidad : req.body.especialidad, foto: req.body.foto } },
            { new: true, runValidators: true }
            );
        if (!profesores) return res.status(404).send("profesores no encontrado");
        console.log("profesores actualizado:", profesores);
        res.redirect("/profesoress/");
    } catch (err) {
        console.error("Error al actualizar profesores:", err);
        res.status(500).send("Error al actualizar el profesores");
    }
};


profesoresController.eliminar = async (req, res) => {                      //Eliminar
    try {
        const result = await profesores.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return 
            res.status(404).send("profesores no encontrado");
            console.log("profesores eliminado");
            res.redirect("/profesores/");
    } catch (err) {
        console.error("Error al eliminar profesores:", err);
        res.status(500).send("Error al eliminar el profesores");
    }
};
