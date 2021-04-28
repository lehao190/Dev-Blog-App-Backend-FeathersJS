// Initializes the `tags_posts` service on path `/tags-posts`
const { TagsPosts } = require('./tags_posts.class');
const createModel = require('../../models/tags_posts.model');
const hooks = require('./tags_posts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tags-posts', new TagsPosts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags-posts');

  service.hooks(hooks);
};
