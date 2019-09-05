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
	var sql = []

	var currentDate = new Date()

	// Colocar mês anterior
	currentDate.setMonth(currentDate.getMonth() - 1)
	sql.push({ "parcelas.mes": currentDate.getMonth() + 1, "parcelas.ano": currentDate.getFullYear() })
	nMonths.push({ fullYear: currentDate.getFullYear(), month: currentDate.getMonth() + 1 })

	// Volto para o mês atual
	currentDate.setMonth(currentDate.getMonth() + 1)

	for (let qtd = 1; qtd <= nMonth; qtd++) {
		sql.push({
			"parcelas.mes": currentDate.getMonth() + 1,
			"parcelas.ano": currentDate.getFullYear()
		})

		nMonths.push({
			fullYear: currentDate.getFullYear(),
			month: currentDate.getMonth() + 1
		})

		currentDate.setMonth(currentDate.getMonth() + 1)
	}

	nMonths.sort((a, b) => {
		return a.fullYear - b.fullYear || a.month - b.month;
	});

	function returnDescriptionMonth(month) {
		switch (month) {
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
	Titulo.find({ $or: sql }, function (err, docs) {
		nMonths.forEach(({ month, fullYear }) => {
			totalDebito = 0
			totalCredito = 0

			const parcelasMes = []
			docs.forEach(({ descricao, tipoLancamento, parcelas, _id: titulo_id }) => {
				// console.log(parcelas.length)
				parcelas.filter(({ mes, ano }) => (mes === month) && (ano === fullYear))
					.forEach(({ valor, pago, _id: parcela_id, nroParcela }) => {
						totalCredito += tipoLancamento === 'C' ? valor : 0
						totalDebito += tipoLancamento === 'D' ? valor : 0

						parcelasMes.push({
							parcela_id,
							titulo_id,
							descricao,
							qtdTotalParcelas: parcelas.length,
							nroParcela,
							tipoLancamento,
							valor,
							pago
						})
					})
			})

			const mes = {
				mes: returnDescriptionMonth(month) + '/' + fullYear.toString().substr(-2),
				totalCredito,
				totalDebito,
				parcelas: parcelasMes
			}

			if (parcelasMes.length) {
				months.push(mes)
			}
		})

		res.status(200).json(months)
	}).sort({
		"ano": 1,
		"mes": 1,
		"tipoLancamento": 1,
		"descricao": 1
	})
})

Titulo.route('payed', (req, res, next) => {
	// payed?pay=1&idTitulo=5d646587be4b640017f2abad&idParcela=5d646587be4b640017f2abae
	const qry = url.parse(req.url, true)

	const payed = qry.query.pay
	const idTitulo = qry.query.idTitulo
	const idParcela = qry.query.idParcela

	Titulo.find({ "_id": { $in: idTitulo } }, function (err, docs) {
		if (!err) {
			const parcelas = docs[0].parcelas

			parcelas.map((p) => {
				if (p._id == idParcela) {
					p.pago = payed
				}
			})

			const myquery = { _id: idTitulo }
			const newvalues = { $set: { "parcelas": parcelas } }

			Titulo.updateOne(myquery, newvalues, (err, res) => {
				if (err) {
					throw err
				}
			})
				.then((response) => { console.log('Sucesso ao atualizar', response) })
				.catch((error) => { console.log('Erro ao atualizar', error) })

			res.status(200).json(parcelas)
		}
	})
		.catch((error) => { console.log('Deu erro ao buscar', error) })
})

module.exports = Titulo