// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  app.post('/login', async (req, res) => {
    const auth = await app.service('authentication').create({
      strategy: 'local',
      email: req.body.email,
      password: req.body.password
    });

    console.log('auth data: ', auth)

    res.json('Hello Dude you good, Yeah man');
  });
};
