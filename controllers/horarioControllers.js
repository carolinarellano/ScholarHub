// controllers/horarioController.js
const Horario = require('../mongo/horarioModel');

// Función para agregar una materia al horario
async function agregarMateriaAlHorario(req, res) {
    try {
        const { nombreMateria, hora, diasSemana } = req.body;

        const nuevaMateria = new Horario({
            nombreMateria,
            hora,
            diasSemana,
        });

        await nuevaMateria.save();

        res.status(201).json({ mensaje: 'Materia agregada al horario con éxito' });
    } catch (error) {
        console.error('Error al agregar materia al horario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Otros controladores relacionados con el horario pueden ir aquí

module.exports = { agregarMateriaAlHorario };
