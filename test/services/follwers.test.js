const assert = require('assert');
const app = require('../../src/app');

describe('\'follwers\' service', () => {
  it('registered the service', () => {
    const service = app.service('follwers');

    assert.ok(service, 'Registered the service');
  });
});
