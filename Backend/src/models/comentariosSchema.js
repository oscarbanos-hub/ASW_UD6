// esquema para comentarios

const mongoose = require('mongoose');
const comentarioSchema = new mongoose.Schema({

    usuarioID: { type: String, required: true, trim: true },
    cursoID: { type: String, required: true, trim: true },
    comentario: { type: String, required: true, trim: false },            // no eliminar espacios 
    puntuacion : {type: Number, requiered: true, trim: true},             // admite dos tipos de numeración   
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', comentarioSchema);