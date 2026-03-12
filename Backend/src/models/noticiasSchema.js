// esquema para noticias

const mongoose = require('mongoose');
const noticiasSchema = new mongoose.Schema({

    titulo: { type: String, required: true, trim: true },
    resumen: { type: String, required: true, trim: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Noticia', noticiasSchema);
