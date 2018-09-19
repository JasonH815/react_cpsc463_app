// Initializes the `deck` service on path `/deck`
const createService = require('feathers-mongodb');
const hooks = require('./deck.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/deck', createService(options));

  //TODO extend base mongo service and add ability to create mutliples of a 52 card deck
  //TODO add hook to validate deck creation options

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('deck');

  mongoClient.then(db => {
    service.Model = db.collection('deck');
  });

  service.hooks(hooks);
};
