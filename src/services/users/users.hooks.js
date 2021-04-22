const { authenticate } = require('@feathersjs/authentication').hooks

const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks

const checkProvider = require('../../hooks/check-provider')

const authResult = require('../../hooks/auth-result')

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [checkProvider(), authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
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
