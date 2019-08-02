const express = require('express')

module.exports.assignRoutes = server => {

    // API Routes 
    const router = express.Router()
    server.use('/api', router)

    // TITULO Routes
    const tituloService = require('../api/titulo/tituloService')
    tituloService.register(router, '/titulos') // Registra todos os "Todo.methods(['get', 'post', 'put', 'delete'])"
}

