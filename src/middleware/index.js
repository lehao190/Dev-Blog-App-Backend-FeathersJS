const session = require('express-session')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(
    session({
      secret: 'session-secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: true,
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  )

  app.post('/login', async (req, res) => {
    // Authenticate user with Local Strategy
    const auth = await app.service('authentication').create({
      strategy: 'local',
      email: req.body.email,
      password: req.body.password
    })

    req.session.authentication = {
      strategy: 'jwt',
      accessToken: auth.accessToken
    }

    res.json(auth)
  })

  app.post('/aha', async (req, res) => { 
    console.log(req.session.authentication)
    res.json('Nothing mate')
  })
}
