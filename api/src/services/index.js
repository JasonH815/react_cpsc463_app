const example = require('./example/example.service.js');
const deck = require('./deck/deck.service.js');
const game = require('./game/game.service.js');
const player = require('./player/player.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(example);
  app.configure(deck);
  app.configure(game);
  app.configure(player);
};
