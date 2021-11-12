const { authenticate } = require('@feathersjs/authentication').hooks
const {
  hashPassword,
  protect
} = require('@feathersjs/authentication-local').hooks

const createImageURL = require('../../hooks/create-image-url')
const validateRegister = require('../../hooks/validate-register')

const deleteOneImage = require('../../hooks/delete-one-image');

const deleteMultiUsersImages = require('../../hooks/delete-multi-users-images');

// const imageErrorHandler = require('../../hooks/image-error-handler');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [validateRegister(), hashPassword('password'), createImageURL()],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      deleteOneImage(),
      createImageURL()
    ],
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
    remove: [deleteMultiUsersImages()]
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
