// Initializes the `follwers` service on path `/follwers`
const { Follwers } = require('./follwers.class');
const createModel = require('../../models/follwers.model');
const hooks = require('./follwers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/follwers', new Follwers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('follwers');

  service.hooks(hooks);
};
