module.exports = function (requisicao, resposta, next) {
    // Procurar na internet por cabeçalhos do cors e para que eles servem. 
    resposta.header('Access-Control-Allow-Origin', '*') // no lugar do * pode restringir api's 
    resposta.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    resposta.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    // Tem que ter o next para dar continuidade
    next()
}