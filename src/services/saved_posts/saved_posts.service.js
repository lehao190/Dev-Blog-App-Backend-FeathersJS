// Initializes the `saved_posts` service on path `/saved-posts`
const { SavedPosts } = require('./saved_posts.class');
const createModel = require('../../models/saved_posts.model');
const hooks = require('./saved_posts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/saved-posts', new SavedPosts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('saved-posts');

  service.hooks(hooks);
};
