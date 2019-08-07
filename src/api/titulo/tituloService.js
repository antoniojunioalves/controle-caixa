const Titulo = require('./tituloSchema')
const url = require('url')

Titulo.methods(['get', 'post', 'put', 'delete'])

// new - Quando altera o cliente NÃO retorna o objeto atualizado por default 
// runValidators - Não valida por default as configurações se é obrigado ou não informar alguma informação 
// Titulo.updateOptions({ new: true, runValidators: true }) 

Titulo.route('separadoMes', (req, res, next) => {
  const q = url.parse(req.url, true)

  const nMonths = [6, 7] // q.query.month.split('-').sort()

  const months = []
  Titulo.find({ "parcelas.mes": { $in: nMonths } }, function (err, docs) {
    for (let i = 0; i < nMonths.length; i++) {
      const parcelasMes = docs.map((doc) => {
        console.log('****************   DOC  ****************')
        console.log(doc)
        const encontrou = doc.parcelas.find(({ mes }) => mes === nMonths[i])
        if (encontrou) {
          const adicionarRegistrosTemp = {
            descricao: doc.descricao + nMonths[i],
            tipoLancamento: doc.tipoLancamento,
            valor: encontrou.valor,
            pago: encontrou.pago
          }
          return adicionarRegistrosTemp
        } else {
          return null
          // console.log('Não Encontrou ')
          // const adicionarRegistrosTemp = {
          //   descricao: 'NAOTRAZER',
          //   tipoLancamento: '1',
          //   valor: 1,
          //   pago: false
          // }
          // return adicionarRegistrosTemp
        }
      })
      console.log(`****************   MES ${nMonths[i]}   **************************`)
      console.log(parcelasMes)

      const parcelasSemNull = parcelasMes.filter(parcela => parcela !== null)
      console.log(`****************   parcela sem null   **************************`)
      console.log(parcelasSemNull)
      const antonio = {
        mes: nMonths[i],
        parcelasSemNull
      }
      console.log(`****************   ANTONIO ${nMonths[i]}   **************************`)
      console.log(antonio)
      // months = [...months, antonio]
      console.log(`****************   PASSSSSOOOOUUUUUUUUUU   **************************`)
      // console.log('PARCELASSSSSSSS')
      // console.log(parcelasMes)
      // console.log('resultado FINAL:')

      console.log({ months })
    }
    res.status(500).json(months)

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
  //   res.status(500).json({ mes: 6, parcelas })
  // })
})

module.exports = Titulo