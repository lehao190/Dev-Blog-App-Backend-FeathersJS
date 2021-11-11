// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { result } = context;

    console.log('result: ', result)

    if (!result.length) {
      console.log('no length: ', result)
    }

    return context;
  };
};
