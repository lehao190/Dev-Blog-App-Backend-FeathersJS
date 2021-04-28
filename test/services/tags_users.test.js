const assert = require('assert');
const app = require('../../src/app');

describe('\'tags_users\' service', () => {
  it('registered the service', () => {
    const service = app.service('tags-users');

    assert.ok(service, 'Registered the service');
  });
});
