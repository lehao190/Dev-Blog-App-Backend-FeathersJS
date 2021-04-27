const { Service } = require('feathers-knex');

exports.Comments = class Comments extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'comments'
    });
  }
};
