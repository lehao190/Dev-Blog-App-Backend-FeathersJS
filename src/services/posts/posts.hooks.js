const { authenticate } = require('@feathersjs/authentication').hooks;

const mutatePostsData = require('../../hooks/mutate-posts-data');
const createImageURL = require('../../hooks/create-image-url')

const mutateSinglePostData = require('../../hooks/mutate-single-post-data');
const deleteMultiPostsImages = require('../../hooks/delete-multi-posts-images');

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
    find: [mutatePostsData()],
    get: [mutateSinglePostData()],
    create: [],
    update: [],
    patch: [],
    remove: [deleteMultiPostsImages()]
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
