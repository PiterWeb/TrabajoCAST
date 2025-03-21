/* Este archivo define la estructura de los datos (esquema) 
y crea un modelo de Mongoose para interactuar con la base de datos. */

const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  rol: { 
    type: String, 
    required: true, 
    enum: ['Administrador', 'Cliente'], // Solo estos tipos son permitidas
  },
});


const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;