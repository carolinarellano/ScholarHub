const { Schema, model } = require('mongoose');

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    profesor: {
        type: String,
        required: true
    },
    colorBtn: {
        type: String,
        required: true
    },
    rubros: {
        type: Array,  
        required: true
    }
});

module.exports = model('Materia', materiaSchema);
