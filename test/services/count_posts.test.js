const assert = require('assert');
const app = require('../../src/app');

describe('\'count_posts\' service', () => {
  it('registered the service', () => {
    const service = app.service('count-posts');

    assert.ok(service, 'Registered the service');
  });
});
