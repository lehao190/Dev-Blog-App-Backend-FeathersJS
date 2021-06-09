const { authenticate } = require('@feathersjs/authentication').hooks
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks

const createUserAvatar = require('../../hooks/create-user-avatar')
const validateRegister = require('../../hooks/validate-register')

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateRegister(), hashPassword('password'), createUserAvatar()],
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
