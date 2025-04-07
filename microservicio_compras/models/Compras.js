/* Este archivo define la estructura de los datos (esquema) 
y crea un modelo de Mongoose para interactuar con la base de datos. */

const mongoose = require("mongoose");

const comprasSchema = new mongoose.Schema({

  id_cliente: { type: mongoose.Types.ObjectId, required: true },
  nombre: { type: String, required: true },
  id_articulo: { type: mongoose.Types.ObjectId, required: true },
  cantidad: { type: Number, required: true },
  direccion: { type: String, required: true },
});


const Compras = mongoose.model("Compra", comprasSchema);
module.exports = Compras;