// Initializes the `player` service on path `/player`
const createService = require('feathers-mongodb');
const hooks = require('./player.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/player', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('player');

  mongoClient.then(db => {
    service.Model = db.collection('player');
  });

  service.hooks(hooks);
};
