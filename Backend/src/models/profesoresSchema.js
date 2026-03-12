//modelo para profesores

const mongoose = require('mongoose');

const profesoresSchema = new mongoose.Schema({

nombre: { type: String, required: true, trim: true },
email: { type: String, required: true, trim: true },
especialidad: {type: String, required: true, trim:true},
foto: {type: Object, required: false}

});

module.exports = mongoose.model('Profesor', profesoresSchema);