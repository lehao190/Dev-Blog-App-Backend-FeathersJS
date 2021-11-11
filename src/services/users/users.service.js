// Initializes the `users` service on path `/users`
const { Users } = require("./users.class");
const createModel = require("../../models/users.model");
const hooks = require("./users.hooks");

const multer = require("multer");
const { firebaseBucket } = require("../../app.js");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ['remove']
  };

  // Initialize our service with any options it requires
  app.use(
    "/users",
    async (req, res, next) => {
      const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 1 * 1024 * 1024,
        },
      }).single("user_avatar");

      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(400).json({
            message: "File có dung lượng lớn!",
          });
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(400).json({
            message: "Không thể tạo ảnh",
          });
        }

        // Everything went fine.
        next();
      });
    },
    async (req, res, next) => {
      if (req.file) {
        const bucketName = firebaseBucket.name;
        const fileToken = uuidv4();
        const fileName = Date.now().toString() + req.file.originalname;
        const blob = firebaseBucket.file(fileName);

        req.feathers.file = req.file;
        req.feathers.fileToken = fileToken;
        req.feathers.bucketName = bucketName;
        req.feathers.fileName = fileName;
        req.feathers.blob = blob;
      }

      next();
    },
    new Users(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);
};
