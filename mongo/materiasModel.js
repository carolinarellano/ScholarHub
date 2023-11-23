const { Schema, model } = require('mongoose');

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    horario: {
        type: Array,
        required: true
    },
    ponderaciones: {
        type: Array,
        required: true
    }
});

module.exports = model('Materias', materiaSchema);
