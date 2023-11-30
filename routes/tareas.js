const express = require('express');
const router = express.Router();

const tareasModel = require('../mongo/tareasModel');
const materiaModel = require('../mongo/materiasModel');

router.route('/tareas')
    .get(async (req, res) => {
        try {
            const tarea = await tareasModel.find({});
            res.status(200).json(tarea);
        } catch (error) {
            res.status(500).send("No se puede acceder a la tarea solicitada");
        }
    })
    .post((req, res) => {
        materiaModel.findOne({ nombre: req.body.materia })
            .then(materia => {
                const tarea = new tareasModel({
                    ...req.body,
                    materia: materia._id
                });
                console.log("Tarea creada con éxito.");
                tarea.save()
                    .then(() => res.status(201).json('Tarea creada!'))
                    .catch(err => res.status(500).json('Error: ' + err));
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Error al buscar la materia");
            });
    });

router.route('tareas/:id')
    .put((req, res) => {
        try {
            tareasModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send("Se ha actualizado la tarea correctamente");
        } catch (error) {
            return res.status(404).send("Tarea no encontrada");
        }
    })
    .delete((req, res) => {
        try {
            tareasModel.findByIdAndDelete(req.params.id);
            res.status(200).send("Se ha eliminado la tarea correctamente");
        } catch (error) {
            return res.status(404).send("Tarea no encontrada");
        }
    });

module.exports = router;