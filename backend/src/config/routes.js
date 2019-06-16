const express = require('express')

module.exports = function(server){

    // API Routes 
    const router = express.Router()
    server.use('/api', router)

    // TITULO Routes
    const tituloService = require('../api/titulo/tituloService')
    tituloService.register(router, '/titulos') // Registra todos os "Todo.methods(['get', 'post', 'put', 'delete'])"

    // PARCELA Routes
    const parcelaService = require('../api/parcela/parcelaService')
    parcelaService.register(router, '/parcelas') // Registra todos os "Todo.methods(['get', 'post', 'put', 'delete'])"
    
    // const todoService = require('../api/todo/todoService')
    // todoService.register(router, '/todos') // Registra todos os "Todo.methods(['get', 'post', 'put', 'delete'])"
}

