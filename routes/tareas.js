const express = require('express');
const router = express.Router();

const tareasModel = require('../mongo/tareasModel');

router.route('/tareas')
    .get((req, res) => {
        try {
            const tarea = tareasModel.find({});
            res.status(200).json(tarea);
        } catch (error) {
            res.status(500).send("No se puede acceder a la tarea solicitada");
        }
    })
    .post((req, res) => {
        try {
            const tarea = new tareasModel(req.body);
            tarea.save();
        }
        catch (error) {
            res.status(500).send("No se puede crear la tarea")
        }
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