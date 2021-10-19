const { authenticate } = require('@feathersjs/authentication').hooks;

const imageErrorHandler = require('../../hooks/image-error-handler');
const createImageURL = require('../../hooks/create-image-url')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), createImageURL()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [imageErrorHandler()],
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
