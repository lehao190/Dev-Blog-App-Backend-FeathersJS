// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { NotFound, GeneralError, BadRequest } = require('@feathersjs/errors');

module.exports = (options = {}) => {
  return async context => {
    // console.log('check-provider data: ', context.data)

    const { params } = context

    context.service.emit('hello', { hello: 'Hello world, this is Custom Event Dude !!!' })

    // console.log('connection: ', params.connection)

    // Check if GET method from Authenticated User 
    // if (params.provider === 'rest' && params.headers.authorization) {
    //   console.log('Im getting User with REST !!!')
    // }

    // Only for Internal call when login
    // if (params.provider === 'rest' && !params.headers.authorization && !params.authStrategies) {
    //   throw new Error('Không thể gọi API')
    // }
    
    return context;
  };
};
