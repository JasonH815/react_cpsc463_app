// Initializes the `card` service on path `/card`
const createService = require('feathers-mongodb');
const hooks = require('./cards.hooks');
const _ = require('lodash');

//Store the ranks and suits as objects to support dot notation
const RANKS = _.reduce(
  ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  (obj, rank) => {
    return {...obj, [rank.toUpperCase()]:rank};
  },
  {});

const SUITS = _.reduce(
  ['heart', 'diamond', 'club', 'spade'],
  (obj, suit) => {
    return {...obj, [suit.toUpperCase()]:suit};
  },
  {});

const SuitService = {
  find() {
    return Promise.resolve(SUITS);
  }
};

const RankService = {
  find() {
    return Promise.resolve(RANKS);
  }
};


module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/cards/suits', SuitService);
  app.use('/cards/ranks', RankService);
  app.use('/cards', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const cardService = app.service('cards');

  mongoClient.then(db => {
    cardService.Model = db.collection('cards');
  });

  cardService.hooks(hooks);
};
