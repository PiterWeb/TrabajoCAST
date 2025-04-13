
function isClient(req,res,next){

    const idUsuario = req.query.idUsuario;

    const apiUrlUsuarios = 'http://localhost:3002/api/client';

    fetch(`${apiUrlUsuarios}?idUsuario=${idUsuario}`, {
        method: "GET"
    })
    .then(response => {
        if (response.status === 200) return next()

        if (response.status === 401) return res.status(401).send('Sin autorizacion')

        return res.status(500).send("Internal server error")
    })

}

module.exports = isClient;