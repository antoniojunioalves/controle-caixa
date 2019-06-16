const restful = require('node-restful')
const mongoose = restful.mongoose

const parcelaSchema = new mongoose.Schema({
    descricao: { type: String, require: true },
    nroParcela: { type: Number, require: true  },
    valor: { type: Number, default: 0 },
    pago: { type: Boolean, default: false },
    
    dataInsercao: { type: Date, default: Date.now }
})

module.exports = restful.model('Parcela', parcelaSchema)

// descricao: Mesa TokStok
// nroParcela: 1
// valor: 99,9
// pago: false
