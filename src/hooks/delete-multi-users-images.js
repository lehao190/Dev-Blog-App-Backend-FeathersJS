// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { firebaseBucket } = require("../app.js");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { result } = context;

    if (!result.length) {
      if (result.user_avatar && !result.githubId && !result.googleId) {
        let hashImage;

        hashImage = result.user_avatar.split("dev-blogger-app.appspot.com/o/");

        if (hashImage[0] === "https://firebasestorage.googleapis.com/v0/b/") {
          hashImage = hashImage[1].split("?alt");
          hashImage = hashImage[0];
        }

        firebaseBucket
          .file(hashImage)
          .delete()
          .then(() => {
            console.log("Delete image user Successfully");
          })
          .catch(() => {
            throw Error("Xảy ra lỗi khi xóa ảnh");
          });
      }
    }

    if (result.length) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].user_avatar && !result[i].githubId && !result[i].googleId) {
          let hashImage;

          hashImage = result[i].user_avatar.split("dev-blogger-app.appspot.com/o/");

          if (hashImage[0] === "https://firebasestorage.googleapis.com/v0/b/") {
            hashImage = hashImage[1].split("?alt");
            hashImage = hashImage[0];
          }

          firebaseBucket
            .file(hashImage)
            .delete()
            .then(() => {
              console.log("Delete image user Successfully");
            })
            .catch(() => {
              throw Error("Xảy ra lỗi khi xóa ảnh");
            });
        }
      }
    }

    return context;
  };
};
