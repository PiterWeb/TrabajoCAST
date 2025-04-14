const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usuario = require("./models/Usuario")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json()); // Permite leer JSON en las solicitudes
app.use(cors()); // Habilita CORS para conectar con Angular

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Importar rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

app.get("/api/admin", async (req, res) => {
  const idUsuario = req.query.idUsuario;
  
  try {
    const usuarios = await Usuario.findById(idUsuario);
    if (!usuarios) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    console.log(usuarios)
    if (usuarios.rol === "Administrador") return res.status(200)
    res.status(401).send('Sin autorizacion')
  } catch (err) {
    res.status(500).send("Internal server error")
  }

})

app.get("/api/client", async (req, res) => {
  const idUsuario = req.query.idUsuario;
  
  try {
    const usuarios = await Usuario.findById(idUsuario);
    if (!usuarios) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    console.log(usuarios)
    if (usuarios.rol === "Cliente") return res.status(200).send("OK")
    res.status(401).send('Sin autorizacion')
  } catch (err) {
    res.status(500).send("Internal server error")
  }
  
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
