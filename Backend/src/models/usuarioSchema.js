// Modelo para usuario 


const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

nombre: { type: String, required: true, trim: true },
email: { type: String, required: true, trim: true },
passwordHash:{type: String, required: true, trim: true},
rol: { type: String, required: true, trim: true}

});

module.exports = mongoose.model('Usuario', usuarioSchema);