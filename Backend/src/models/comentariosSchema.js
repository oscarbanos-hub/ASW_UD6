// esquema para comentarios

const mongoose = require('mongoose');
const comentarioSchema = new mongoose.Schema({

    usuarioID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cursoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cursos', required: true },
    comentario: { type: String, required: true, trim: false },            // no eliminar espacios
    puntuacion : {type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', comentarioSchema);