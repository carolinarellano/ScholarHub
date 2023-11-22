const express = require('express');
const router = express.Router();

const horarioModel = require('../mongo/horarioModel');

router.route('/horario')
    .get((req, res) => {
        try {
            const horario = horarioModel.find({});
            res.status(200).json(horario);
        } catch (error) {
            res.status(500).send("No se puede acceder al horario solicitado");
        }
    })
    .post((req, res) => {
        try {
            const horario = new horarioModel(req.body);
            horario.save();
        }
        catch (error) {
            res.status(500).send("No se puede crear el horario")
        }
    });

router.route('horario/:id')
    .put((req, res) => {
        try {
            horarioModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send("Se ha actualizado el horario correctamente");
        }
        catch (error) {
            return res.status(404).send("Horario no encontrado");
        }
    })
    .delete((req, res) => {
        try {
            horarioModel.findByIdAndDelete(req.params.id);
            res.status(200).send("Se ha eliminado el horario correctamente");
        }
        catch (error) {
            return res.status(404).send("Horario no encontrado");
        }
    });

module.exports = router;
