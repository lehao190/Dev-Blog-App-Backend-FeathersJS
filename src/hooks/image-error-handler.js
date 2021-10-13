// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    // console.log('data HERE: ', context.data)
    // console.log('RESULT data HERE: ', context.result)
    // console.log('params HERE: ', context.params)


    let user = await context.app.service("users").get(103);
    
    for (let i = 0; i < context.result.data.length; i++) {
      // const tags = await context.app.service("tags-posts").find();
      // console.log("all tags number: ", i);
      // console.log("all tags: ", tags);

      context.result.data[i].user_Profile = user
      delete context.result.data[i].user_Profile.password
    }

    return context;
  };
};
