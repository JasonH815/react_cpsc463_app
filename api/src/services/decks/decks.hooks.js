const {BadRequest} = require('@feathersjs/errors');

const MAX_DECKS = 5;

function validateDeckCount(context) {
  function checkDeckCount(n){
    if (!n || Number.isNaN(n)) {
      throw new BadRequest('Must send a nonzero "count" property for number of decks to create');
    } if(n > MAX_DECKS) {
      throw new BadRequest(`Must create no more than ${MAX_DECKS} at a time`);
    }
  }

  if (Array.isArray(context.data)) {
    context.data.forEach(data => checkDeckCount(data.count));
  } else {
    checkDeckCount(context.data.count);
  }
  return context;
}



module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validateDeckCount],
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
