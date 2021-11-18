// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context

    if (data.title.trim() === '') {
      // errors.title = 'Tiêu đề không được bỏ trống!!!'

      throw new BadRequest('Giá trị nhập vào không đúng', {
        errors: {
          title: 'Tiêu đề không được bỏ trống!!!'
        }
      })
    }

    return context;
  };
};
