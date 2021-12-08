//middleware de 404 por si no entro a ningun endpoint
module.exports = (request, response, next) => { 
    response.status(404).end()
}