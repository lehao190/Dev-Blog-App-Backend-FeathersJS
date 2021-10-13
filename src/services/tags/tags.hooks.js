const { authenticate } = require('@feathersjs/authentication').hooks;

const validateTag = require('../../hooks/validate-tag');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), validateTag()],
    update: [authenticate('jwt'), validateTag()],
    patch: [authenticate('jwt'), validateTag()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
