const express = require('express');
const router = express.Router();

const materiaModel = require('../mongo/materiasModel');

router.route('/horario')
    .get((req, res) => {
        try {
            const materia = materiaModel.find({});
            res.status(200).json(materia);
        } catch (error) {
            res.status(500).send("No se puede obtener la materia solicitada");
        }
    })
    .post((req, res) => {
        try {
            const materia = new materiaModel(req.body);
            materia.save();
        }
        catch (error) {
            res.status(500).send("No se puede crear la materia")
        }
    });

router.route('horario/:id')
    .put((req, res) => {
        try {
            materiaModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send("Se ha actualizado la materia correctamente");
        }
        catch (error) {
            return res.status(404).send("Materia no encontrada");
        }
    })
    .delete((req, res) => {
        try {
            materiaModel.findByIdAndDelete(req.params.id);
            res.status(200).send("Se ha eliminado la materia correctamente");
        }
        catch (error) {
            return res.status(404).send("Materia no encontrada");
        }
    });

module.exports = router;
