// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, result, params } = context

    if (params.joinTags) {
      for (let i = 0; i < result.data.length; i++) {
        const tags = await app.service("tags-posts").find({
          query: {
            postId: result.data[i].id,
          },
        });

        result.data[i].tags = [];

        for (let j = 0; j < tags.data.length; j++) {
          const tag = await app.service("tags").get(tags.data[j].tagId);

          result.data[i].tags.push(tag.tag_name);
        }
      }
    }

    return context;
  };
};
