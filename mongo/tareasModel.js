const { Schema, model } = require('mongoose');

const tareaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
});

module.exports = model('Tarea', tareaSchema);