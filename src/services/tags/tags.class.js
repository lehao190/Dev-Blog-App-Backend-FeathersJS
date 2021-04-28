const { Service } = require('feathers-knex');

exports.Tags = class Tags extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tags'
    });
  }
};
