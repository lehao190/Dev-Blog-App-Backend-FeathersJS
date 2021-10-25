// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result } = context;

    if (result) {
      const user = await app.service("users").get(result.userId);

      const tags = await app.service("tags-posts").find({
        query: {
          postId: result.id,
        },
      });

      result.tags = [];

      for (let j = 0; j < tags.data.length; j++) {
        const tag = await app.service("tags").get(tags.data[j].tagId);

        result.tags.push(tag.tag_name);
      }

      result.comments = [];
      result.user_profile = user;
      
      delete result.user_profile.password;
    }

    return context;
  };
};
