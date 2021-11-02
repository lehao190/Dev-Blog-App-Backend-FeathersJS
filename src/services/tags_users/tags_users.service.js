// Initializes the `tags_users` service on path `/tags-users`
const { TagsUsers } = require('./tags_users.class');
const createModel = require('../../models/tags_users.model');
const hooks = require('./tags_users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['remove']
  };

  // Initialize our service with any options it requires
  app.use('/tags-users', new TagsUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags-users');

  service.hooks(hooks);
};
