// Initializes the `deck` service on path `/deck`
const hooks = require('./decks.hooks');
const _ = require('lodash');
const { Service: MongoService } = require('feathers-mongodb');

class DecksService extends MongoService{
  async setup(app) {
    this.app = app;
    this.suits = await app.service('cards/suits').find();
    this.ranks = await app.service('cards/ranks').find();
  }

  /**
   * constructs a deck of cards and saves them using the card service
   * @param data
   * @return {void|*}
   */
  async create(data){
    const {count, shuffle, playerId, gameId} = data;
    const cardsService = this.app.service('cards');
    const cards = _.flatMap(
      _.range(count),
      deckNumber => this._make({...data, deckNumber}));
    let createdCards = await cardsService.create(cards);
    createdCards = shuffle? _.shuffle(createdCards): createdCards;
    const deck = {
      playerId,
      gameId,
      deck: createdCards.map(card => card._id)
    };
    const createdDeck = await super.create(deck);
    return {
      cards: createdCards,
      deck: createdDeck
    };
  }

  /**
   * Creates a deck of card objects
   * @param {String} gameId
   * @param {String} playerId
   * @param {Number} deckNumber
   * @private
   * @return {Array}
   */
  _make({gameId, playerId, deckNumber}) {
    const {suits, ranks} = this;
    return _.flatMap(_.values(suits), suit => {
      return _.values(ranks).map(rank => {
        return {
          gameId,
          playerId,
          suit,
          rank,
          deckNumber
        };
      });
    });
  }
}

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/decks', new DecksService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('decks');

  mongoClient.then(db => {
    service.Model = db.collection('decks');
  });

  service.hooks(hooks);
};
