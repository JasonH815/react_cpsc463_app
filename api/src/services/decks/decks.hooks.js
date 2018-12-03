const {BadRequest} = require('@feathersjs/errors');

const MAX_DECKS = 5;

function validateMaxDecks(context) {
  function checkMaxDecks(n){
    if (Number.isNaN(n) || parseInt(n) > MAX_DECKS) {
      throw new BadRequest(`Must create no more than ${MAX_DECKS} at a time`);
    }
  }

  if (Array.isArray(context.data)) {
    context.data.forEach(data => checkMaxDecks(data.count));
  } else {
    checkMaxDecks(context.data.count);
  }
  return context;
}



module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateMaxDecks],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
