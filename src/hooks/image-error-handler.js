// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log('data HERE: ', context.data)
    console.log('RESULT data HERE: ', context.result)

    // if (context.error) {
    //   console.log('Image Error MATE!!!: ', context.error)
    // }
    return context
  };
};
