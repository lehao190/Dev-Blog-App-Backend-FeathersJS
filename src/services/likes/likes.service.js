// Initializes the `likes` service on path `/likes`
const { Likes } = require('./likes.class');
const createModel = require('../../models/likes.model');
const hooks = require('./likes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/likes', new Likes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('likes');

  service.hooks(hooks);
};
