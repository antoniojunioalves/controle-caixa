const Parcela = require('./parcelaSchema')

Parcela.methods(['get', 'post', 'put', 'delete'])

// new - Quando altera o cliente NÃO retorna o objeto atualizado por default 
// runValidators - Não valida por default as configurações se é obrigado ou não informar alguma informação 
Parcela.updateOptions({ new: true, runValidators: true }) 

module.exports = Parcela