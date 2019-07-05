const restful = require('node-restful')
const mongoose = restful.mongoose
const parcelaSchema = require('../parcela/parcelaSchema')

const tituloSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    qtdVezes: { type: Number, required: true  },
    valor: { type: Number, default: 0 },
    tipoLancamento: { type: String },
    
    dataInsercao: { type: Date, default: Date.now },
    
    // parcelas: [{
    //     descricao: { type: String, required: true },
    //     nroParcela: { type: Number, required: true  }
    //     // valor: { type: Number, default: 0 },
    //     // pago: { type: Boolean, default: false }
    // }]

    // description: { type: String, require: true },
    // done: { type: Boolean, required: true, default: false },
    // createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Titulo', tituloSchema)

 

// descricao: Mesa TokStok
// qtdVezes: 10
// valor: 999
// tipoLancamento: Debito
