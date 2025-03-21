const express = require("express");
const router = express.Router();
const Disfraz = require("../models/Disfraz");
const mongoose = require("mongoose")

// 📌 Obtener todos los disfraces
router.get("/", async (req, res) => {
  try {
    const disfraces = await Disfraz.find();
    res.json(disfraces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Obtener un disfraz por ID o nombre
router.get("/:param", async (req, res) => {
  const param = req.params.param;

  // Verifica si el parámetro es un ObjectId válido
  if (mongoose.Types.ObjectId.isValid(param)) {
    try {
      const disfraz = await Disfraz.findById(param);
      if (!disfraz) return res.status(404).json({ mensaje: "Disfraz no encontrado" });
      res.status(200).json(disfraz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Si no es un ObjectId, buscar por nombre
    try {
      const disfraz = await Disfraz.find({
        nombre: { $regex: new RegExp(param, "i") },
      });
      if (!disfraz) return res.status(404).json({ mensaje: "Disfraz no encontrado" });
      res.status(200).json(disfraz);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// 📌 Crear un nuevo disfraz
router.post("/", async (req, res) => {
  const { nombre, marca, cantidad, precio, tipo } = req.body;
  try {
    const nuevoDisfraz = new Disfraz({
      tipo,
      nombre,
      marca,
      cantidad,
      precio
    });

    await nuevoDisfraz.save();
    res.status(201).json(nuevoDisfraz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Actualizar un disfraz por ID
router.put("/:id", async (req, res) => {
  try {
    const disfrazActualizado = await Disfraz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disfrazActualizado) return res.status(404).json({ mensaje: "Disfraz no encontrado" });
    res.json(disfrazActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Eliminar un disfraz por ID
router.delete("/:id", async (req, res) => {
  try {
    const disfrazEliminado = await Disfraz.findByIdAndDelete(req.params.id);
    if (!disfrazEliminado) return res.status(404).json({ mensaje: "Disfraz no encontrado" });
    res.json({ mensaje: "Disfraz eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
