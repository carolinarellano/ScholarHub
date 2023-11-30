// routes/materias.js
const express = require('express');
const router = express.Router();
const Materia = require('../mongo/materiasModel'); // Ajusta la ruta según la estructura de tu proyecto

// Ruta para obtener todas las materias
router.get('/materias', async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener una materia por su ID
router.get('/materias/:id', obtenerMateria, (req, res) => {
    res.json(res.materia);
});

// Ruta para crear una nueva materia
router.post('/materias', async (req, res) => {
    const materia = new Materia(req.body);
    try {
        const nuevaMateria = await materia.save();
        res.status(201).json(nuevaMateria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para actualizar una materia
router.patch('/materias/:id', obtenerMateria, async (req, res) => {
    if (req.body.nombre != null) {
        res.materia.nombre = req.body.nombre;
    }
    // Repite este proceso para las demás propiedades
    // ...

    try {
        const materiaActualizada = await res.materia.save();
        res.json(materiaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta para eliminar una materia
router.delete('/materias/:id', obtenerMateria, async (req, res) => {
    try {
        await res.materia.remove();
        res.json({ message: 'Materia eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware para obtener una materia por su ID
async function obtenerMateria(req, res, next) {
    try {
        const materia = await Materia.findById(req.params.id);
        if (materia == null) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.materia = materia;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = router;