const mongoose = require('mongoose')

var db

module.exports.createConnectionMongoose = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      return db;
    }
    mongoose.Promise = global.Promise;  // Feito somente para tirar a advertência 

    let stringConnectionDB = 'mongodb://localhost/controleCaixa'
    // process.env.NODE_ENV === 'production' ?
    //     `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@cluster0-afjvm.mongodb.net/test?retryWrites=true&w=majority`
    //     : 'mongodb://localhost/controleCaixa'

    mongoose
      .connect(stringConnectionDB, { useNewUrlParser: true })
      .then(() => {
        console.log("[DATABASE] - Mongo is connected");
        resolve(db);
      })
      .catch(err => {
        console.log("[DATABASE] - Error on Mongo connection");
        reject(err);
      });
  });
};