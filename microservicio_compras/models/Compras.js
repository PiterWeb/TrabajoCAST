/* Este archivo define la estructura de los datos (esquema) 
y crea un modelo de Mongoose para interactuar con la base de datos. */

const mongoose = require("mongoose");

const comprasSchema = new mongoose.Schema({

  id_cliente: { type: String, required: true },
  nombre: { type: String, required: true },
  id_articulo: { type: String, required: true },
  cantidad: { type: Number, required: true },
  direccion: { type: String, required: true },
});


const Compras = mongoose.model("Compra", comprasSchema);
module.exports = Compras;