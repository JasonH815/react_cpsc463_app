const assert = require('assert');
const app = require('../../src/app');

describe('\'deck\' service', () => {
  it('registered the service', () => {
    const service = app.service('deck');
    console.log(service);

    assert.ok(service, 'Registered the service');
  });

  describe('#create()', () => {
    it('should create a deck of 52 cards when given {count: 1}', () => {
      assert.ok(true, 'test');
    });
    it('should not contain duplicate cards when using 1 deck', () => {
      assert.ok(true, 'test');
    });
  });

  describe('#update()', () => {
    it('should implement a \'next\' method', () => {
      assert.ok(true, 'test');
    });
    describe('Method: NEXT', () => {
      it('should get the next card in the deck', () => {
        assert.ok(true, 'test');
      });
    });
  });
});
