// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.service.emit('hello', { hello: 'Hello world, this is Custom Event Dude !!!' })

    return context
  };
};
