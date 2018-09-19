// Initializes the `game` service on path `/game`
const createService = require('feathers-mongodb');
const hooks = require('./game.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/game', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('game');

  mongoClient.then(db => {
    service.Model = db.collection('game');
  });

  service.hooks(hooks);
};
