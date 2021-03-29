const {
  AuthenticationBaseStrategy,
  AuthenticationService,
  JWTStrategy
} = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')

class MyAuthService extends AuthenticationService {
  async create (data, params) {
    const a = await super.create(data, params)
    // const b = await super.authenticate(data, params, ...this.configuration.authStrategies)
    // const c = await super.getTokenOptions(a, params)

    return a
  }
}

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate (authentication, params) {
    return {
      anonymous: true
    }
  }
}

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  async authenticate (authentication, params) {
    const { token } = authentication

    const config = this.authentication.configuration[this.name]

    // const user = await this.app.service('users').get(1, params)

    const match = config.allowedKeys.includes(token)
    if (!match) throw new NotAuthenticated('Incorrect API Key')

    return {
      authentication: {
        strategy: 'apiKey'
      }
      // user
    }
  }
}

module.exports = app => {
  // const authentication = new AuthenticationService(app)
  const authentication = new MyAuthService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('apiKey', new ApiKeyStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
