const port = process.env.PORT || 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

const router = require('../config/routes')

// midleware todas as requisições que chegar passará por aqui
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

// server.listen(port, function() {
//     console.log(`BACKEND is running on port ${port}.`)
// })

router.assignRoutes(server)

module.exports = server