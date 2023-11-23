const express = require('express');
const router = express.Router();

const calificacionesModel = require('../mongo/calificacionesModel');

router.route('/calificaciones')
    .get((req, res) => {
        try {
            const calificacion = calificacionesModel.find({});
            res.status(200).json(calificacion);
        } catch (error) {
            res.status(500).send("No se puede acceder a la calificación solicitada");
        }
    });