// Initializes the `users` service on path `/users`
const { Users } = require('./users.class')
const createModel = require('../../models/users.model')
const hooks = require('./users.hooks')
const Multer = require('multer')
const { firebaseBucket } = require('../../app.js')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { format } = require('util')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 2 * 1024 * 1024 // no larger than 2mb
    }
  })

  // Initialize our service with any options it requires
  app.use(
    '/users',
    multer.single('user_avatar'),
    async (req, res, next) => {
      const bucketName = firebaseBucket.name
      const fileToken = uuidv4()
      const fileName = Date.now().toString() + req.file.originalname
      const blob = firebaseBucket.file(fileName)

      // Upload file to firebase
      const URL = await new Promise((resolve, reject) => {
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
            metadata: {
              firebaseStorageDownloadTokens: fileToken
            }
          }
        })
  
        blobStream.on('error', err => {
          reject(err)
        })
  
        let avatarURL
  
        blobStream.on('finish', () => {
          avatarURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileName}?alt=media&token=${fileToken}`
          console.log('Upload Successfully, Here is Avatar URL: ', avatarURL)
          resolve(avatarURL)
        })
  
        blobStream.end(req.file.buffer)
      })

      req.feathers.avatarURL = URL
      next()
    },
    new Users(options, app)
  )

  // Get our initialized service so that we can register hooks
  const service = app.service('users')

  service.hooks(hooks)
}
