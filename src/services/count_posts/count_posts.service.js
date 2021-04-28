// Initializes the `count_posts` service on path `/count-posts`
const { CountPosts } = require('./count_posts.class');
const createModel = require('../../models/count_posts.model');
const hooks = require('./count_posts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/count-posts', new CountPosts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('count-posts');

  service.hooks(hooks);
};
