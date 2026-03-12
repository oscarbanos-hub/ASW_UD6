// esquema para cursos

const mongoose = require('mongoose');
const cursosSchema = new mongoose.Schema({

    titulo: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    nivel: { type: String, required: true, trim: false },               // no eliminar espacios
    duracion : {type: Number, required: true },
    descripcion: {type: String, required: true, trim: true},
    imagen: {type: Object, required: false},
    profesorID: {type: mongoose.Schema.Types.ObjectId, ref: 'Profesor', required: true},
    temario:{type: String, required: true, trim: true},
    contenido: [{type: String}],                                   // lista de temas del curso
    objetivos: [{type: String}],
    requisitos: {type: String, trim: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cursos', cursosSchema);