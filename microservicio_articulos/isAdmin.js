
function isAdmin(req,res,next){

    const idUsuario = req.query.idUsuario;

    const apiUrlUsuarios = 'http://localhost:3002/api/usuarios';

    fetch(`${apiUrlUsuarios}/${idUsuario}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        if (response.rol === "Administrador") return next()
        
        res.status(401).send('Sin autorizacion')
        
    })

}

module.exports = isAdmin;