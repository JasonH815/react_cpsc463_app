// Initializes the `deck` service on path `/deck`
const hooks = require('./decks.hooks');
const _ = require('lodash');

class DecksService {
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
  create(data){
    const {count, shuffle} = data;
    const cards = _.flatMap(_.range(count), () => this._make(data));
    return this.app.service('cards').create(shuffle? _.shuffle(cards) : cards);
  }

  /**
   * Creates a deck of card objects
   * @param {String} gameId
   * @param {String} playerId
   * @private
   * @return {Array}
   */
  _make({gameId, playerId}) {
    const {suits, ranks} = this;
    return _.flatMap(_.values(suits), suit => {
      return _.values(ranks).map(rank => {
        return {
          gameId,
          playerId,
          suit,
          rank
        };
      });
    });
  }
}

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/decks', new DecksService());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('decks');
  service.hooks(hooks);
};
