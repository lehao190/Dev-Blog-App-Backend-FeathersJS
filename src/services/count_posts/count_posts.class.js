const { Service } = require('feathers-knex');

exports.CountPosts = class CountPosts extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'count_posts'
    });
  }
};
