// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, result } = context

    for (let i = 0; i < result.data.length; i++) {
      const user = await app.service("users").get(result.data[i].userId);

      result.data[i].username = user.username
      result.data[i].user_avatar = user.user_avatar
    }

    return context;
  };
};
