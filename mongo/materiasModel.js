const { Schema, model } = require('mongoose');

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    profesor: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    rubros: {
        type: Array,
        required: true
    },
    periodo: {
        type: String,
        requiered: true
    },
    horario: {
        type: Array,
        required: false
    }
});

module.exports = model('Materias', materiaSchema);
