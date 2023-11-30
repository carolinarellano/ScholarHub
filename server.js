const express = require('express');
require('./database');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const materiasRoutes = require('./routes/materias');
const tareasRoutes = require('./routes/tareas');
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets'))); 
app.use('/fonts', express.static(path.join(__dirname, 'fonts'))); 
app.use('/html', express.static(path.join(__dirname, 'html'))); 
app.use('/libs', express.static(path.join(__dirname, 'libs'))); 
app.use('/scss', express.static(path.join(__dirname, 'scss')));
app.use('/functions', express.static(path.join(__dirname, 'functions'))); 

//Routes
app.use(usuariosRoutes);
app.use(materiasRoutes);
app.use(tareasRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/html/ingresar', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/html/registro', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/registro.html'))
});

app.get('/html/olvidar-contrasena', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/olvidar-contrasena.html'))
});

app.get('/html/horario', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/horario.html'))
});

app.get('/html/inicio', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/inicio.html'))
});

app.get('/html/perfil', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/perfil.html'))
});

app.get('/html/tareas', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/tareas.html'))
});

//Init
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: " + port);
});

module.exports = app;
