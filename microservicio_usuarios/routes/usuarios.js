const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const mongoose = require("mongoose")
const isAdminMiddleware = require("../isAdmin")

//router.use(isAdminMiddleware)

// 📌 Obtener todos los usuarios
router.get("/", isAdminMiddleware, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Obtener un usario por ID o rol
router.get("/:param", isAdminMiddleware, async (req, res) => {
  const param = req.params.param;

  // Verifica si el parámetro es un ObjectId válido
  if (mongoose.Types.ObjectId.isValid(param)) {
    try {
      const usuarios = await Usuario.findById(param);
      if (!usuarios) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Si no es un ObjectId, buscar por rol
    try {
      const usuarios = await Usuario.find({
        rol: { $regex: new RegExp(param, "i") },
      });
      if (!usuarios) return res.status(404).json({ mensaje: "Usuario no encontrado" });
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// 📌 Crear un nuevo usuario
router.post("/", async (req, res) => {
  const { rol} = req.body;
  try {
    const nuevoUsuario = new Usuario({
      rol,
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Actualizar un usuario por ID
// router.put("/:id", async (req, res) => {
//   try {
//     const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
//     res.json(usuarioActualizado);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 📌 Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const idUsuario = req.query.idUsuario

    if (idUsuario !== req.params.id) return res.status(401).json({ error: "No puedes eliminar un usuario distinto del tuyo"})

    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json({ mensaje: "Disfraz eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
