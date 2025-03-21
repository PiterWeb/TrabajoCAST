/* Este archivo define la estructura de los datos (esquema) 
y crea un modelo de Mongoose para interactuar con la base de datos. */

const mongoose = require("mongoose");

const disfrazSchema = new mongoose.Schema({
  tipo: { 
    type: String, 
    required: true, 
    enum: ['Payaso', 'Niño', 'Animmales', 'Navideños'], // Solo estos tipos son permitidas
  },
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});


const Disfraz = mongoose.model("Disfraz", disfrazSchema);
module.exports = Disfraz;