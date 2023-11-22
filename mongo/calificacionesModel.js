const { Schema, model } = require('mongoose');

const calificacionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    }
});

module.exports = model('Calificacion', calificacionSchema);