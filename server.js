const express = require('express');
require('./database');
const cors = require('cors');
const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes

app.use(require('./routes/usuarios'))
app.use(require('./routes/materias'));
app.use(require('./routes/horario'));


//Init
app.listen(port, () => {
  console.log("Server running in port: 3000");
});

module.exports = app;
