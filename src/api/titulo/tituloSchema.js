const restful = require('node-restful')
const mongoose = restful.mongoose

const parcelaSchema = new mongoose.Schema({
  nroParcela: { type: Number, required: true },
  mes: { type: Number, required: true },
  ano: { type: Number, required: true },
  valor: { type: Number, default: 0 },
  pago: { type: Boolean, default: false }
})

const tituloSchema = new mongoose.Schema({
  descricao: { type: String, required: false },
  valor: { type: Number, default: 0 },
  tipoLancamento: { type: String },
  dataInsercao: { type: Date, default: Date.now },

  parcelas: [parcelaSchema]
})

module.exports = restful.model('Titulo', tituloSchema)


/*
  Exemplo de JSon de inserção.

{
	"descricao": "Mesa Tokstok",
	"valor": "999.50",
    "tipoLancamento": "Débito",
    "dataInsercao": "1460376000",

	"parcelas": [{
        "nroParcela": "1",
        "mes": "6",
        "ano": "2019",
        "valor": "99.95",
        "pago": "false"
	},
	{
        "nroParcela": "2",
        "mes": "7",
        "ano": "2019",
        "valor": "99.95",
        "pago": "false"
	}]
}


**********************************************************
 let meses = []

            let mes = {
                mes: 6,
                parcelas:[
                    {
                        descricao: "Antônio",
                        tipoLancamento: "Crédito",
                        valor: 1000,
                        pago: false
                    },{
                        descricao: "Andréia",
                        tipoLancamento: "Crédito",
                        valor: 1500,
                        pago: false
                    },{
                        descricao: "Mesa 1",
                        tipoLancamento: "Débito",
                        valor: 100,
                        pago: false
                    }
                ]
            }

*/
