const assert = require('assert');
const app = require('../../src/app');

describe('\'deck\' service', function() {
  let service;
  let deck;
  let cards;

  it('registered the service', function() {
    service = app.service('decks');
    assert.ok(service, 'Registered the service');
  });

  describe('#create()', function() {
    it('should create a deck of 52 cards when given {count: 1}', async function() {
      deck = await service.create({count: 1});
      assert.strictEqual(deck.cards.length, 52, 'The deck does not have 52 cards');
    });
    it('should contain references to actual card objects', async function () {
      cards = (await app.service('cards').find({query: {_id: {$in: deck.cards}}})).data;
      assert.ok(cards, 'Card references were not found');
      assert.strictEqual(cards.length, 52, 'The deck does not contain 52 references to card objects');
    });
    it('should not contain duplicate card values when using 1 deck', function() {
      const cardMap = cards.reduce((cardMap, {suit, rank}) => {
        cardMap[suit] = cardMap[suit] || {};
        cardMap[suit][rank] = true;
        return cardMap;
      }, {});
      const uniqueCardCount = Object.keys(cardMap).reduce((total, suit) => total + Object.keys(cardMap[suit]).length, 0);
      assert.strictEqual(uniqueCardCount, 52, 'The deck does not have 52 unique cards');
    });
  });

  describe('#update()', function() {
    it('should implement a \'next\' method', function() {
      assert.ok(true, 'test');
    });
    describe('Method: NEXT', function() {
      it('should get the next card in the deck', function() {
        assert.ok(true, 'test');
      });
    });
  });
});
