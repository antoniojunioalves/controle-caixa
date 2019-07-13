const restful = require('node-restful')
const mongoose = restful.mongoose

const tituloSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, default: 0 },
    tipoLancamento: { type: String },
    dataInsercao: { type: Date, default: Date.now },
    dataInicialCobranca: { type: Date, required: true },

    parcelas: [{
        nroParcela: { type: Number, required: true  },
        dataVencimento: { type: Date, required: true },
        valor: { type: Number, default: 0 },
        pago: { type: Boolean, default: false }
    }]
})

module.exports = restful.model('Titulo', tituloSchema)

 
/*
  Exemplo de JSon de inserção. 

{
	"descricao": "Mesa Tokstok",
	"valor": "999.50",
    "tipoLancamento": "Débito",
    "dataInsercao": "1460376000",
    "dataInicialCobranca": "1460376000",

	"parcelas": [{
        "nroParcela": "1",
        "dataVencimento": "1460376000",
        "valor": "99.95",
        "pago": "false"
	},
	{
        "nroParcela": "2",
        "dataVencimento": "1460376001",
        "valor": "99.95",
        "pago": "false"
	}]
}  


*/
