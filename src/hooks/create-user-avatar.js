// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { result, app, params } = context
    // update user's avatar
    result.user_avatar = params.avatarURL

    await app.service('users').patch(result.id, {
      user_avatar: params.avatarURL
    })

    return context;
  };
};
