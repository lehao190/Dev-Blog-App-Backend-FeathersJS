const { Service } = require('feathers-knex');

exports.TagsUsers = class TagsUsers extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tags_users'
    });
  }
};
