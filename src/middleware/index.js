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

  // Get user on Refresh
  app.get('/me', async (req, res) => {
    const { authentication } = req.session

    if (!authentication) {
      return res.status(401).json({
        message: 'Chưa đăng nhập !!!'
      })
    }

    return res.status(200).json(authentication.user)
  })

  // Issue new token when access token expired
  app.post('/refresh_tokens', async (req, res) => {
    const { accessToken } = req.body
    const { refreshToken } = req.session.authentication

    const payload = await app
      .service('authentication')
      .verifyAccessToken(accessToken, { ignoreExpiration: true })

    if (Date.now() >= payload.exp * 1000 && refreshToken) {
      const newAccessToken = await app
        .service('authentication')
        .createAccessToken({
          sub: payload.sub
        })

      return res.json({
        accessToken: newAccessToken
      })
    }

    return res.status(401).json({
      message: 'Invalid Refresh Token'
    })
  })
}
