const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    nombreMateria: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    diasSemana: {
        type: [String], // Puedes cambiarlo según tu necesidad, por ejemplo, un array de objetos con más detalles
        required: true,
    },
});

const Horario = mongoose.model('Horario', horarioSchema);

module.exports = Horario;
