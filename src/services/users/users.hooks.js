const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks

const userTest = require('../../hooks/user-test')

const allowAnonymous = require('../../hooks/allow-anonymous')

const allowApiKey = require('../../hooks/allow-api-key');

module.exports = {
  before: {
    all: [authenticate('jwt'), userTest()],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
}
