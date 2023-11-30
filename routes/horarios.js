const express = require('express');
const router = express.Router();
const Horario = require('../mongo/horarioModel');
const horarioController = require('../controllers/horarioControllers');

router.post('/agregar-materia', horarioController.agregarMateriaAlHorario);

// Ruta para agregar al horario
router.post('/agregarAlHorario', async (req, res) => {
    const { nombreMateria, hora, diasSemana } = req.body;

    try {
        const nuevoHorario = new Horario({ nombreMateria, hora, diasSemana });
        const resultado = await nuevoHorario.save();
        res.json({ mensaje: 'Agregado al horario exitosamente', resultado });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al horario', mensaje: error.message });
    }
});

module.exports = router;
