// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const noTagsJoin = context.params.query.noTagsJoin
    const userId = context.params.query.userId;

    if (userId && !noTagsJoin) {
      delete context.params.query
    } else if (userId && noTagsJoin) {
      delete context.params.query.noTagsJoin
    }

    const query = context.service.createQuery(context.params);

    if (userId && !noTagsJoin) {
      query
        .distinctOn("tags_posts.postId", "tags_users.userId")
        .select(
          "posts.id",
          "posts.userId",
          "posts.title",
          "posts.post_image",
          "posts.count_likes",
          "posts.created_at",
          "users.username",
          "users.user_avatar"
        )
        .from("tags_users")
        .innerJoin("tags", "tags.id", "tags_users.tagsId")
        .innerJoin("tags_posts", "tags_posts.tagId", "tags_users.tagsId")
        .innerJoin("posts", "posts.id", "tags_posts.postId")
        .innerJoin("users", "posts.userId", "users.id")
        .where("tags_users.userId", userId);

      context.params.knex = query;
      context.params.joinTags = true;
    }

    return context;
  };
};
