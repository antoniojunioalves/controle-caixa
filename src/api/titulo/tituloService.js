const Titulo = require('./tituloSchema')

Titulo.methods(['get', 'post', 'put', 'delete'])
 
// new - Quando altera o cliente NÃO retorna o objeto atualizado por default 
// runValidators - Não valida por default as configurações se é obrigado ou não informar alguma informação 
Titulo.updateOptions({ new: true, runValidators: true }) 


Titulo.route('separadoMes', (req, res, next) => {
    Titulo.find({ "parcelas.mes": 6 }, function (err, docs) {
    // Titulo.find({ descricao: "Forno" }, function (err, docs) {
        if (err) {
            console.log('[ERROR] - ' + err)
        } else {
            let meses = []

            let mes = {
                mes: 6,
                parcelas:[
                    {
                        nome: "Antônio",
                        tipoLancamento: "Crédito",
                        valor: 1000,
                        pago: false
                    },{
                        nome: "Andréia",
                        tipoLancamento: "Crédito",
                        valor: 1500,
                        pago: false
                    },{
                        nome: "Mesa 1",
                        tipoLancamento: "Débito",
                        valor: 100,
                        pago: false
                    }
                ]
            }

            meses = [...meses, mes]

            mes = {
                mes: 7,
                parcelas:[
                    {
                        nome: "Antônio",
                        tipoLancamento: "Crédito",
                        valor: 1000,
                        pago: false
                    },{
                        nome: "Andréia",
                        tipoLancamento: "Crédito",
                        valor: 1500,
                        pago: false
                    },{
                        nome: "Mesa 2",
                        tipoLancamento: "Débito",
                        valor: 100,
                        pago: false
                    }
                ]
            }

            meses = [...meses, mes]

            res.status(500).json([meses])
        }
    })
})

module.exports = Titulo