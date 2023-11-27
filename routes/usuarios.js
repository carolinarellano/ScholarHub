const express = require('express');
const router = express.Router();

const usuariosModel = require('../mongo/usuariosModel');

router.get('/users', async (req, res) => {
    try {
        const usuarios = await usuariosModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).send("No se encontraron usuarios");
    }
});

router.get('/users/:usuario/:password?', async (req, res) => {
    try {
        const user = req.params.usuario;
        const password = req.params.password;

        const usuario = await usuariosModel.findOne({ usuario: usuario });

        if (!usuario) {
            return res.status(404).json({ mensaje: "No se encontró el usuario." });
        } else {
            if (password) {
                if (usuario.compare(password)) {
                    res.status(200).json(usuario);
                } else {
                    res.status(500).send("La contraseña no es correcta.");
                }
            } else {
                res.status(200).json(usuario);
            }
        }
    } catch (error) {
        res.status(500).send("Error" + error.message);
    }
});


router.post("/users", async (req, res) => {
    try {
        let newUser = new usuariosModel({
            usuario: req.body.usuario,
            email: req.body.email,
            password: req.body.password
        });
        let usersSave = await newUser.save();
        res.status(201).json(usersSave);
        console.log("Usuario guardado: ", usersSave);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post("/ingresar", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const userFound = await usuariosModel.findOne({ usuario: usuario });

        if (!userFound) {
            console.log("No se encontró el usuario.");
            console.log(userFound);
            return res.status(404).json({ mensaje: "No se encontró el usuario." });
        }

        if (userFound.compare(password)) {
            res.status(200).json(userFound);
            res.redirect('/inicio.html');
        } else {
            res.status(401).json({ mensaje: "La contraseña no es correcta." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const userFound = await usuariosModel.findOne({ usuario: usuario });

        if (!userFound) {
            console.log("No se encontró el usuario.");
            console.log(userFound);
            console.log(req.body);
            return res.status(404).json({ mensaje: "No se encontró el usuario." });
        }

        if (userFound.compare(password)) {
            res.status(200).json(userFound);
            res.redirect('/inicio.html');
        } else {
            res.status(401).json({ mensaje: "La contraseña no es correcta." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/registro", async (req, res) => {
    try {
        const { usuario, email, password } = req.body;

        let newUser = new usuariosModel({
            usuario,
            email,
            password
        });

        let userSaved = await newUser.save();
        res.status(201).json(userSaved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;