// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { firebaseBucket } = require("../app.js");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data, params } = context;
    
    if (data.editAvatar) {
      if (data.editAvatar !== 'undefined' && params.file && data.firebaseImage === 'true') {
        firebaseBucket.file(data.editAvatar).delete()
          .then(() => {
            console.log('Delete previous image Successfully')
          })
          .catch(() => {
            throw Error('Xảy ra lỗi khi xóa ảnh cũ')
          })
      }
      else if (data.editAvatar !== 'undefined' && params.file && data.firebaseImage === 'false') {
        throw Error('Không thể thay đổi ảnh tài khoản Github hoặc Google')
      }
      else if (data.editAvatar !== 'undefined' && !params.file) {
        delete data.user_avatar
      }

      delete data.editAvatar
      delete data.firebaseImage
    }

    return context;
  };
};
