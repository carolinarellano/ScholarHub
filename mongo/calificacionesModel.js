const { Schema, model } = require('mongoose');

const calificacionSchema = new Schema({
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = model('Calificacion', calificacionSchema);