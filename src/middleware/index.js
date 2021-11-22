const { NotAuthenticated } = require('@feathersjs/errors')

const session = require('express-session')
const redis = require('redis')

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
  // host: '127.0.0.1'
  // port: 6379
})

const sessionOpts = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'session-secret',
  name: 'user',
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: false,
    httpOnly: true,
    secure: false,
    maxAge: 520 * 60 * 60 * 1000
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

  app.get('/getUser', async (req, res) => {
    const user = await app.service('users').get(req.query.id)

    if (!user) {
      return res.status(404).json({
        message: 'Người dùng không tồn tại!!!'
      })
    }

    delete user.password

    res.status(200).json(user)
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
    if (req.session.authentication) {
      const { accessToken } = req.body
      const { refreshToken } = req.session.authentication
      
      const payloadAccessToken = await app
        .service('authentication')
        .verifyAccessToken(accessToken, { ignoreExpiration: true })

      const payloadRefreshToken = await app
        .service('authentication')
        .verifyAccessToken(refreshToken, { ignoreExpiration: true })

      // Destroy Session when Refresh Token expired
      if (Date.now() >= payloadRefreshToken.exp * 1000) {
        req.session.destroy(err => {
          if (err) {
            console.log('Không thể hủy Session')
            throw new err()
          }
        })

        res.clearCookie('user')

        return res.status(401).json({
          message: 'Refresh Token hết thời hạn',
          iat: payloadRefreshToken.iat,
          exp: payloadRefreshToken.exp
        })
      }

      // Issue Access Token if Refresh Token still alive
      if (Date.now() >= payloadAccessToken.exp * 1000 && refreshToken) {
        const newAccessToken = await app
          .service('authentication')
          .createAccessToken({
            sub: payloadAccessToken.sub
          })

        return res.json({
          accessToken: newAccessToken
        })
      }

      return res.status(200).json({
        message: 'Token vẫn còn hiệu lực !!!'
      })
    }
    
    return res.status(401).json({
      message: 'Không thể tạo token mới !!!'
    })
  })

  app.post('/logout', async (req, res) => {
    if (req.session.authentication) {
      req.session.destroy(err => {
        if (err) {
          console.log('Không thể hủy Session')
          throw new err()
        }
      })

      res.clearCookie('user')

      return res.status(201).json({
        message: 'Đăng xuất thành công !!!'
      })
    }

    return res.status(500).json({
      message: 'Không thể đăng xuất !!!'
    })
  })
}
