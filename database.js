const mongoose = require('mongoose');

const mongoConnection = "mongodb+srv://admin:scholarhub@scholarhub.nwvlzcv.mongodb.net/test";

let database = mongoose.connection;

database.on("connecting", () => {
  console.log("Conectando a la base de datos...");
  console.log(mongoose.connection.readyState);
});

database.on("connected", () => {
  console.log("Conexión exitosa");
  console.log(mongoose.connection.readyState);
});

database.on("error", (err) => {
  console.error("Error en la conexión", err);
});

mongoose.connect(mongoConnection);

module.exports = database;