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
app.use(express.static("assets"));
app.use(express.static("fonts"));

//Routes
app.use(usuariosRoutes);
app.use(materiasRoutes);
app.use(horarioRoutes);
app.use(calificacionesRoutes);
app.use(tareasRoutes);

let mongoConnection = "mongodb+srv://admin:scholarhub@scholarhub.nwvlzcv.mongodb.net/"
let db = mongoose.connection;

db.on('connecting', () => {
  console.log('Connecting to MongoDB...');
  console.log(mongoose.connection.readyState);
});

db.on('connected', () => {
  console.log('MongoDB connected!');
  console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/ingresar', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/ingresar.html'))
});

app.get('/registro', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/registro.html'))
});

app.get('/olvidar-consteseña', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/html/olvidar-contraseña.html'))
});

//Init
app.listen(port, () => {
  console.log("Server running in port: 3000");
});

module.exports = app;
