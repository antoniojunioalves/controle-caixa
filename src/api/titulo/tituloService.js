const Titulo = require('./tituloSchema')
const url = require('url')

Titulo.methods(['get', 'post', 'put', 'delete'])
// new - Quando altera o cliente NÃO retorna o objeto atualizado por default 
// runValidators - Não valida por default as configurações se é obrigado ou não informar alguma informação 
Titulo.updateOptions({ new: true, runValidators: true })

Titulo.route('separadoMes', (req, res, next) => {
	const q = url.parse(req.url, true)

	const nMonth = parseInt(q.query.month)
	var nMonths = []
	nMonths[0] = nMonth - 1
	nMonths[1] = nMonth
	nMonths[2] = nMonth + 1
	nMonths[3] = nMonth + 2
	nMonths[4] = nMonth + 3
	nMonths[5] = nMonth + 4
	nMonths[6] = nMonth + 5
	nMonths[7] = nMonth + 6

	console.log(nMonths)
	function RetornarDescricaoMes(mes) {
		switch (mes) {
			case 1: return 'Janeiro'
			case 2: return 'Fevereiro'
			case 3: return 'Março'
			case 4: return 'Abril'
			case 5: return 'Maio'
			case 6: return 'Junho'
			case 7: return 'Julho'
			case 8: return 'Agosto'
			case 9: return 'Setembro'
			case 10: return 'Outubro'
			case 11: return 'Novembro'
			case 12: return 'Dezembro'
			default: 'Mes desconhecido'
		}
	}

	let months = []
	let totalDebito = 0
	let totalCredito = 0
	Titulo.find({ "parcelas.mes": { $in: nMonths } }, function (err, docs) {
		for (let i = 0; i < nMonths.length; i++) {
			totalDebito = 0
			totalCredito = 0

			const parcelasMes = docs.map(({ descricao, tipoLancamento, parcelas }) => {
				const parcela = parcelas.find(({ mes }) => mes === parseInt(nMonths[i]))

				if (parcela) {
					totalCredito += tipoLancamento === 'C' ? parcela.valor : 0
					totalDebito += tipoLancamento === 'D' ? parcela.valor : 0

					return {
						descricao,
						tipoLancamento,
						valor: parcela.valor,
						pago: parcela.pago
					}
				} else {
					return null
				}
			})

			const parcelasSemNull = parcelasMes.filter(parcela => parcela !== null)

			if (parcelasSemNull) {
				const mes = {
					mes: RetornarDescricaoMes(nMonths[i]),
					totalCredito,
					totalDebito,
					parcelas: parcelasSemNull
				}

				months = [...months, mes]
			}
		}
		res.status(200).json(months)
	}).sort({ "descricao": 1 })
})

module.exports = Titulo