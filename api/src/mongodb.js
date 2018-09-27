const url = require('url');
const MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  const config = app.get('mongodb');
  const dbName = url.parse(config).path.substring(1);
  const promise = MongoClient.connect(config).then(client => {
    console.log('connected to mongodb');
    // For mongodb <= 2.2
    if(client.collection) {
      return client;
    }

    return client.db(dbName);
  })
    .catch(err => {
      console.log('Failed to connect to mongo: ', err);
    });

  app.set('mongoClient', promise);
};
