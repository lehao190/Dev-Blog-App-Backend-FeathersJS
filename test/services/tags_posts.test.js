const assert = require('assert');
const app = require('../../src/app');

describe('\'tags_posts\' service', () => {
  it('registered the service', () => {
    const service = app.service('tags-posts');

    assert.ok(service, 'Registered the service');
  });
});
