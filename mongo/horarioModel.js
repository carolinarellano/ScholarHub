const { Schema, model } = require('mongoose');

const horarioSchema = new Schema({
    materias: {
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    },
    diasSemana: {
        type: Array,
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        required: true
    },
    hora: {
        type: String,
        required: true
    }
});

module.exports = model('Horario', horarioSchema);

