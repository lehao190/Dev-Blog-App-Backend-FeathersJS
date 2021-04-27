const { Service } = require('feathers-knex');

exports.Likes = class Likes extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'likes'
    });
  }
};
