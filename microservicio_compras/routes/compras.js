const express = require("express");
const router = express.Router();
const Compras = require("../models/Compras");
const Disfraz = require("../models/Disfraz");
const mongoose = require("mongoose")





// 📌 Obtener todas las compras de un id de usuario
router.get("/", async (req, res) => {

  const id_cliente = req.query.idUsuario

  try {
    const compras = await Compras.aggregate([
      {$match: {id_cliente: new mongoose.Types.ObjectId(id_cliente)}},
      {
        $lookup: {
            from: "disfrazs",
            localField: "id_articulo",
            foreignField: "_id",
            as: "disfraz",
        }
       },
      {$unwind: "$disfraz"}, 
      {
        $project: {
          "disfraz.cantidad": 0
        }
      }
    ]).exec();

    res.json(compras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// TESTEO DE RUTAS PARA NO-MICROSERVICIO ARTICULOS

router.get("/articulos", async (req, res) => {
  console.log(" Entrando en /api/compras/articulos");
  try {
    const articulos = await Disfraz.find();
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/articulos/:param", async (req, res) => {
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


// 📌 Obtener una compra por ID de articulo
router.get("/:param", async (req, res) => {
  const param = req.params.param;
  const id_cliente = req.query.idUsuario

  // Verifica si el parámetro es un ObjectId válido
  if (mongoose.Types.ObjectId.isValid(param)) {
    try {
      const compras = await Compras.aggregate([
        {
          $match: {
            id_cliente: new mongoose.Types.ObjectId(id_cliente),
            id_articulo: new mongoose.Types.ObjectId(param)
          }
        },
        {
          $lookup: {
              from: "disfrazs",
              localField: "id_articulo",
              foreignField: "_id",
              as: "disfraz",
          }
        },
        {$unwind: "$disfraz"}, 
        {
          $project: {
            "disfraz.cantidad": 0
          }
        }
      ]).exec();
      // const compras = await Compras.findById(param);
      if (!compras) return res.status(404).json({ mensaje: "Compra no encontrada" });
      res.status(200).json(compras);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Si no es un ObjectId
    res.status(500).json({ error: "El parametro enviado no es un ID" });
  }
});

// 📌 Crear una nueva compra
router.post("/", async (req, res) => {
  const { id_cliente, nombre, id_articulo, cantidad, direccion } = req.body;
  try {
    const nuevaCompra = new Compras({
      id_cliente,
      nombre,
      id_articulo,
      cantidad,
      direccion
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
