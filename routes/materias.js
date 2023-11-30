const express = require('express');
const router = express.Router();

const materiaModel = require('../mongo/materiasModel');

router.route('/horario')
    .get(async (req, res) => {
        try {
            const materia = await materiaModel.find();
            res.status(200).json(materia);
        } catch (error) {
            console.log(error);
            res.status(500).send("No se puede obtener la materia solicitada");
        }
    })
    .post( async (req, res) => {
        try {
            console.log(req.body);
            const materia = new materiaModel(req.body);
            await materia.save();
            res.status(201).json(materia); 
        }
        catch (error) {
            console.log(error);
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
