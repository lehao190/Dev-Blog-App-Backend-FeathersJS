const { Service } = require('feathers-knex');

exports.Posts = class Posts extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'posts'
    });
  }
};
