// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { result, app, params } = context

    // console.log('params: ', params)

    // await app.service('users').patch(result.id, {
    //   user_avatar: params.avatarURL
    // }, params)

    return context;
  };
};
