const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAdminMiddleware = require('./isClient')
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Permite leer JSON en las solicitudes
app.use(cors()); // Habilita CORS para conectar con Angular
app.use(isAdminMiddleware);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Importar rutas
const disfracesRoutes = require("./routes/compras");
app.use("/api/compras", disfracesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
