const session = require('express-session')
const redis = require('redis')

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

const sessionOpts = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'session-secret',
  name: 'user',
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: true,
    httpOnly: true,
    secure: false,
    maxAge: 1 * 60 * 60 * 1000
  }
})

// module.exports = sessionOpts

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  
  app.use(sessionOpts)

  app.use((req, res, next) => {
    req.feathers.session = req.session
    next()
  })

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

      // res.json({
      //   refreshToken,
      //   user
      // })

      // create User's Session
      req.session.authentication = {
        refreshToken,
        user
      }

      res.status(201).json(req.session.authentication)
    } catch (error) {
      res.status(error.code).json(error)
    }
  })

  app.get('/me', async (req, res) => {
    // console.log('session authentication: ', req.session)

    const { user } = req.session.authentication

    if (!user) {
      throw new Error('No luck found user !!!')
    }

    return res.status(200).json(user)
  })
}
