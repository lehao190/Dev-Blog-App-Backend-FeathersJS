// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result } = context;

    const { count_likes } = await app.service("posts").get(result.postId);

    const post = await app.service("posts").patch(result.postId, {
      count_likes: count_likes + 1
    });

    return context;
  };
};
