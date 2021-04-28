const { Service } = require('feathers-knex');

exports.TagsPosts = class TagsPosts extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'tags_posts'
    });
  }
};
