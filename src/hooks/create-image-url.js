// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, params } = context;

    // update user's avatar Local Strategy
    if (params.file && !params.authStrategies) {
      const { blob, file, bucketName, fileName, fileToken } = params;

      const URL = await new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
            metadata: {
              firebaseStorageDownloadTokens: fileToken,
            },
          },
        });

        blobStream.on("error", (err) => {
          reject(err);
        });

        let avatarURL;

        blobStream.on("finish", () => {
          avatarURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileName}?alt=media&token=${fileToken}`;
          console.log("Upload Successfully, Here is Image URL: ", avatarURL);
          resolve(avatarURL);
        });

        blobStream.end(file.buffer);
      });

      if (file.fieldname === "user_avatar") {
        data.user_avatar = URL;
      } else {
        data.post_image = URL
      }
    }

    if (!params.file && data.post_image === 'null') {
      delete data.post_image
    } else if (!params.file && data.user_avatar === 'null') {
      delete data.user_avatar
    }

    return context;
  };
};
