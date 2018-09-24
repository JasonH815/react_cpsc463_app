// Initializes the `game` service on path `/game`
const { Service: MongoService } = require('feathers-mongodb');
const hooks = require('./games.hooks');

class GamesService extends MongoService {
  setup(app){
    this.app = app;
  }
  async remove(id, params){
    const decks = await this.app.service('decks').remove(id, params);
    const cards = await this.app.service('cards').remove(id, params);
    const players = await this.app.service('players').remove(id, params);
    const games = await super.remove(id, params);
    return {
      decks,
      cards,
      players,
      games
    };
  }
}

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/games', new GamesService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('games');

  mongoClient.then(db => {
    service.Model = db.collection('games');
  });

  service.hooks(hooks);
};
