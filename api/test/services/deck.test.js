const assert = require('assert');
const app = require('../../src/app');

describe('\'deck\' service', () => {
  it('registered the service', () => {
    const service = app.service('deck');

    assert.ok(service, 'Registered the service');
  });
});
