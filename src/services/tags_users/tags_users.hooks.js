const { authenticate } = require('@feathersjs/authentication').hooks;

const customQueryTagsUsers = require('../../hooks/custom-query-tags-users');

const mutateResultTagsUsersTable = require('../../hooks/mutate-result-tags-users-table');

module.exports = {
  before: {
    all: [],
    find: [customQueryTagsUsers()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [mutateResultTagsUsersTable()],
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
