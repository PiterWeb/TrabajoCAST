const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAdminMiddleware = require('./isAdmin')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json()); // Permite leer JSON en las solicitudes
app.use(cors()); // Habilita CORS para conectar con Angular
app.use(isAdminMiddleware);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Importar rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
