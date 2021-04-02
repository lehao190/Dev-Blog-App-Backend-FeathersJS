const {
  AuthenticationBaseStrategy,
  AuthenticationService,
  JWTStrategy
} = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')
const { NotAuthenticated } = require('@feathersjs/errors')

class MyJwtStrategy extends JWTStrategy {
  async authenticate (data, params) {
    const { accessToken } = data
    const { entity } = this.configuration

    if (!accessToken) {
      throw new NotAuthenticated('No access token')
    }

    const payload = await this.authentication.verifyAccessToken(accessToken)

    if (payload.tokenType === 'refresh') {
      throw new NotAuthenticated('Invalid token. Not an access token')
    }

    const result = {
      accessToken,
      authentication: {
        strategy: 'jwt',
        accessToken,
        payload
      }
    }

    if (entity === null) {
      return result
    }

    const userEntity = await this.getEntity(payload.sub, params)

    return {
      ...result,
      [entity]: userEntity
    }
  }
}

class MyLocalStrategy extends LocalStrategy {
  async getEntity (entity, params) {
    const userEntity = await super.getEntity(entity, params)

    return userEntity
  }
}

class MyAuthService extends AuthenticationService {
  async create (data, params) {
    const { entity } = this.configuration

    const authStrategies =
      params.authStrategies || this.configuration.authStrategies

    if (!authStrategies.length) {
      throw new NotAuthenticated(
        'No Authentication Strategies allowed to create JWT'
      )
    }

    let refreshTokenPayload
    let authResult

    const auth = await this.authenticate(
      data,
      params,
      ...this.configuration.authStrategies
    )
    
    if (data.action === 'refresh' && !data.refresh_token) {
      throw new NotAuthenticated('No refresh token')
    } else {
      authResult = {
        [entity]: auth.user,
        authentication: { strategy: data.strategy }
      }
    }

    const payload = await this.getPayload(authResult, params)
    const jwtOptions = await this.getTokenOptions(authResult, params)
    const accessToken = await this.createAccessToken(payload, jwtOptions)

    const refreshTokenJwtOptions = {
      ...jwtOptions,
      expiresIn: this.configuration.refreshExpiresIn
    }

    refreshTokenPayload = {
      ...payload,
      tokenType: 'refresh',
      [entity]: authResult[entity]
    }

    const refreshToken = await this.createAccessToken(
      refreshTokenPayload,
      refreshTokenJwtOptions
    )
    
    return {
      accessToken,
      refreshToken,
      ...authResult
    }
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

  // authentication.register('jwt', new JWTStrategy())
  // authentication.register('local', new LocalStrategy())
  authentication.register('jwt', new MyJwtStrategy())
  authentication.register('local', new MyLocalStrategy())
  // authentication.register('apiKey', new ApiKeyStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
