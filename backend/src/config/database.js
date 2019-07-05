const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Feito somente para tirar a advertência 
module.exports = mongoose.connect('mongodb://localhost/titulo') // VERIFICAR SE "titulo" É O NOME DO "BANCO DE DADOS".

