const mongoose = require('mongoose')
mongoose.Promise = global.Promise // Feito somente para tirar a advertência 
// module.exports = mongoose.connect('mongodb://localhost/controleCaixa') 

    let stringConnectionDB = 
    process.env.NODE_ENV === 'production' ?
    `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@cluster0-afjvm.mongodb.net/test?retryWrites=true&w=majority`
    : 'mongodb://localhost/controleCaixa'

module.exports = mongoose
    .connect(stringConnectionDB, { useNewUrlParser: true })
    .then(() => {
        console.log("[DATABASE] - Mongo is connected");
    })
    .catch(err => {
        console.log("[DATABASE] - Error on Mongo connection");
    });