const { Service } = require('feathers-knex');

exports.SavedPosts = class SavedPosts extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'saved_posts'
    });
  }
};
