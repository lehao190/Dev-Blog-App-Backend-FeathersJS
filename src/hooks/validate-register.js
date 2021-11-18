// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')
const { validateRegister } = require('../utils/handleErrors/validate_inputs')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { username, email, password, rePassword } = context.data

    // Check user's inputs
    const { errors, isValid } = validateRegister(username, email, password, rePassword)

    if (!isValid) {
      throw new BadRequest('Giá trị nhập vào không đúng', {
        errors
      })
    }

    const user = await context.app.service("users").find({
      query: {
        email
      }
    });

    if (user.data.length) {
      throw new BadRequest('Giá trị nhập vào không đúng', {
        errors: {
          user: 'Người dùng đã tồn tại'
        }
      })
    }

    if (username === 'admin') {
      context.data.admin = true
    }

    delete context.data.rePassword

    return context
  }
}
