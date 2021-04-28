const assert = require('assert');
const app = require('../../src/app');

describe('\'saved_posts\' service', () => {
  it('registered the service', () => {
    const service = app.service('saved-posts');

    assert.ok(service, 'Registered the service');
  });
});
