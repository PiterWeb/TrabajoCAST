const Usuario = require("./models/Usuario");

async function isAdmin(req,res,next){

    const idUsuario = req.query.idUsuario;

    try {
        const usuarios = await Usuario.findById(idUsuario);
        if (!usuarios) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        if (usuarios.rol === "Administrador") return next()
        res.status(401).send('Sin autorizacion')
      } catch (err) {
        res.status(500).send("Internal server Error")
      }


}

module.exports = isAdmin;