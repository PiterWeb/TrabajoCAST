const express = require("express");
const router = express.Router();
const Compras = require("../models/Compras");
const mongoose = require("mongoose")

// 📌 Obtener todas las compras
router.get("/", async (req, res) => {
  try {
    const compras = await Compras.find();
    res.json(compras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Obtener una compra por ID o nombre
router.get("/:param", async (req, res) => {
  const param = req.params.param;

  // Verifica si el parámetro es un ObjectId válido
  if (mongoose.Types.ObjectId.isValid(param)) {
    try {
      const compras = await Compras.findById(param);
      if (!compras) return res.status(404).json({ mensaje: "Compra no encontrada" });
      res.status(200).json(compras);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Si no es un ObjectId, buscar por nombre
    try {
      const compras = await Compras.find({
        nombre: { $regex: new RegExp(param, "i") },
      });
      if (!compras) return res.status(404).json({ mensaje: "Compra no encontrada" });
      res.status(200).json(compras);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// 📌 Crear una nueva compra
router.post("/", async (req, res) => {
  const { id_cliente, nombre, id_articulo, cantidad, direccion, envio } = req.body;
  try {
    const nuevaCompra = new Compras({
      id_cliente,
      nombre,
      id_articulo,
      cantidad,
      direccion,
      envio
    });

    await nuevaCompra.save();
    res.status(201).json(nuevaCompra);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Actualizar una compra por ID
router.put("/:id", async (req, res) => {
  try {
    const compraActualizada = await Compras.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!compraActualizada) return res.status(404).json({ mensaje: "Compra no encontrada" });
    res.json(compraActualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Eliminar una compra por ID
router.delete("/:id", async (req, res) => {
  try {
    const compraEliminada = await Compras.findByIdAndDelete(req.params.id);
    if (!compraEliminada) return res.status(404).json({ mensaje: "Compra no encontrada"});
    res.json({ mensaje: "Compra eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
