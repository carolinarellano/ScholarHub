const express = require('express');
require('./database');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const materiasRoutes = require('./routes/materias');
const horarioRoutes = require('./routes/horario');
const calificacionesRoutes = require('./routes/calificaciones');
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

//Routes
app.use(usuariosRoutes);
app.use(materiasRoutes);
app.use(horarioRoutes);
app.use(calificacionesRoutes);
app.use(tareasRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/ingresar', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/registro', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/registro.html'))
});

app.get('/olvidar-contrasena', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/olvidar-contrasena.html'))
});

//Init
app.listen(port, () => {
  console.log("Server running in port: 3000");
});

module.exports = app;
