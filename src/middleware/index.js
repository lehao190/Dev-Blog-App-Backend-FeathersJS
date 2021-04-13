const session = require('express-session')
const redis = require('redis')

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'session-secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: true,
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    })
  )

  // Login Route
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body

      // Authenticate user with Local Strategy
      const { user, refreshToken, accessToken } = await app
        .service('authentication')
        .create({
          strategy: 'local',
          email,
          password
        })

      // create User's Session
      req.session.authentication = {
        refreshToken,
        user
      }

      req.authentication = req.session.authentication

      res.status(201).json(req.authentication)
    } catch (error) {
      res.status(error.code).json(error)
    }
  })

  // app.post('/aha', async (req, res) => {
  //   console.log('Auth Session: ', req.session.authentication)
  //   res.json('Nothing mate')
  // })
}
