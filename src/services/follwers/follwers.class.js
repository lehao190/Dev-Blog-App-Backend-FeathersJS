const { Service } = require('feathers-knex');

exports.Follwers = class Follwers extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'follwers'
    });
  }
};
