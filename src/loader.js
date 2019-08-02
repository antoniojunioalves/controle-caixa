const server = require('./config/server')
const database = require('./config/database')


database
  .createConnectionMongoose()
  .then(() => {
    var port = process.env.PORT || 3003;

    server.listen(port, () => {
      console.log(`[SERVER] - Server is running on port: ${port}`);
    });
  })
  .catch(err => {
    console.log(`[SERVER - ERROR] - ${err}`);
  });