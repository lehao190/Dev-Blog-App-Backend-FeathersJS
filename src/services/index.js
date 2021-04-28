const users = require('./users/users.service.js');
const posts = require('./posts/posts.service.js');
const comments = require('./comments/comments.service.js');
const likes = require('./likes/likes.service.js');
const tags = require('./tags/tags.service.js');
const tagsUsers = require('./tags_users/tags_users.service.js');
const tagsPosts = require('./tags_posts/tags_posts.service.js');
const countPosts = require('./count_posts/count_posts.service.js');
const savedPosts = require('./saved_posts/saved_posts.service.js');
const follwers = require('./follwers/follwers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(posts);
  app.configure(comments);
  app.configure(likes);
  app.configure(tags);
  app.configure(tagsUsers);
  app.configure(tagsPosts);
  app.configure(countPosts);
  app.configure(savedPosts);
  app.configure(follwers);
};
