// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')
const { validateTag } = require('../utils/handleErrors/validate_inputs')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { tag_name } = context.data
    
    // Check user's inputs
    const { errors, isValid } = validateTag(tag_name)

    if (!isValid) {
      throw new BadRequest('Giá trị nhập vào không đúng', {
        errors
      })
    }

    return context;
  };
};
