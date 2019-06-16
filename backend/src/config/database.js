const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Feito somente para tirar a advertência 
module.exports = mongoose.connect('mongodb://localhost/titulo')

