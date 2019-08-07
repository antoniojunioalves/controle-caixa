const Titulo = require('./tituloSchema')
const url = require('url')

Titulo.methods(['get', 'post', 'put', 'delete'])
// new - Quando altera o cliente NÃO retorna o objeto atualizado por default 
// runValidators - Não valida por default as configurações se é obrigado ou não informar alguma informação 
Titulo.updateOptions({ new: true, runValidators: true })

Titulo.route('separadoMes', (req, res, next) => {
	const q = url.parse(req.url, true)

	const nMonths = q.query.month.split('-').sort()
	// const nMonths = q.query.month

	let months = []
	Titulo.find({ "parcelas.mes": { $in: nMonths } }, function (err, docs) {
		for (let i = 0; i < nMonths.length; i++) {
			const parcelasMes = docs.map(({ descricao, tipoLancamento, parcelas }) => {

				const parcela = parcelas.find(({ mes }) => mes === parseInt(nMonths[i]))
				if (parcela) {
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

			const mes = {
				mes: nMonths[i],
				parcelas: parcelasSemNull
			}

			months = [...months, mes]
		}
		res.status(200).json(months)

	}).sort({ "descricao": 1 })

	// Titulo.find({ "parcelas.mes": 6 }, function (err, docs) {
	//   if (err) { 
	//     throw err 
	//   }

	//   const parcelas = docs.map(({ descricao, tipoLancamento, parcelas }) => {
	//     const { valor, pago } = parcelas.find(({ mes }) => mes === 6)

	//     return {
	//       descricao,  
	//       tipoLancamento,
	//       valor, 
	//       pago
	//     }
	//   })
	//   res.status(200).json({ mes: 6, parcelas })
	// })
})

module.exports = Titulo