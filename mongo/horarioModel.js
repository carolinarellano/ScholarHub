const { Schema, model } = require('mongoose');

const diaSemanaSchema = new Schema({
    dia: {
      type: String,
      enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      required: true
    }
  });

const horarioSchema = new Schema({
    materias: {
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    },
    diasSemana: [diaSemanaSchema],
    hora: {
        type: String,
        required: true
    }
});

module.exports = model('Horario', horarioSchema);

