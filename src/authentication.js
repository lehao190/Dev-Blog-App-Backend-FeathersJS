const {
  AuthenticationBaseStrategy,
  AuthenticationService,
  JWTStrategy
} = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')

const {
  expressOauth,
  OAuthStrategy
} = require('@feathersjs/authentication-oauth')
const { NotAuthenticated, BadRequest } = require('@feathersjs/errors')

const { validateLogin } = require('./utils/handleErrors/validate_inputs')

// Custom JWT
class CustomJwtStrategy extends JWTStrategy {
  async authenticate (data, params) {
    const { accessToken } = data
    const { entity } = this.configuration

    if (!accessToken) {
      throw new NotAuthenticated('No access token')
    }

    const payload = await this.authentication.verifyAccessToken(accessToken)

    // Only for Access Token
    if (payload.tokenType === 'refresh') {
      throw new NotAuthenticated('Không phải token hợp lệ !!!')
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

// Custom Auth Service
class CustomAuthService extends AuthenticationService {
  async create (data, params) {
    // Validate inputs
    if (!params.authStrategies) {
      const { email, password } = data

      const { errors, isValid } = validateLogin(email, password)

      if (!isValid) {
        throw new BadRequest('Giá trị nhập vào không đúng', {
          errors
        })
      }
    }

    const { entity } = this.configuration

    const authStrategies =
      params.authStrategies || this.configuration.authStrategies

    if (!authStrategies.length) {
      throw new NotAuthenticated('Không có Strategy hợp lệ để tạo JWT')
    }

    let refreshTokenPayload
    let authResult

    // Authenticate User
    const authUser = await this.authenticate(data, params, ...authStrategies)

    if (authUser.user.password) {
      delete authUser.user.password
    }

    // Auth result
    authResult = {
      [entity]: authUser.user,
      authentication: { strategy: data.strategy }
    }

    // Access Token Payload
    const payload = await this.getPayload(authResult, params)

    // Access Token options
    const jwtOptions = await this.getTokenOptions(authResult, params)

    // Create Access Token
    const accessToken = await this.createAccessToken(payload, jwtOptions)

    // Refresh Token options
    const refreshTokenJwtOptions = {
      ...jwtOptions,
      expiresIn: this.configuration.refresh.refreshExpiresIn
    }

    // Refresh Token Payload
    refreshTokenPayload = {
      ...payload,
      tokenType: 'refresh',
      [entity]: authResult[entity]
    }

    // Create Refresh Token
    const refreshToken = await this.createAccessToken(
      refreshTokenPayload,
      refreshTokenJwtOptions
    )

    params.session.authentication = {
      refreshToken,
      user: authResult.user
    }

    params.session.save()

    return {
      accessToken,
      ...authResult
      // refreshToken
    }
  }
}

// Github Oauth Auth
class GitHubStrategy extends OAuthStrategy {
  // Get user profile from Oauth Provider
  async getEntityData (profile) {
    const { name, email, avatar_url } = profile

    const baseData = await super.getEntityData(profile)

    return {
      ...baseData,
      // You can also set the display name to profile.name
      username: name,
      email,
      user_avatar: avatar_url
    }
  }

  // Redirect Authenticated User to homepage
  async getRedirect (data) {
    const redirectURL = await super.getRedirect(data)

    const newURL = redirectURL.split('#')

    return newURL[0] + '#/#' + newURL[1]
  }
}

// Google Oauth Auth
class GoogleStrategy extends OAuthStrategy {
  async getEntityData (profile) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile)

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      username: profile.name,
      email: profile.email,
      user_avatar: profile.picture
    }
  }

  // Redirect Authenticated User to homepage
  async getRedirect (data) {
    const redirectURL = await super.getRedirect(data)

    const newURL = redirectURL.split('#')

    return newURL[0] + '#/#' + newURL[1]
  }
}

module.exports = app => {
  const authentication = new CustomAuthService(app)

  authentication.register('jwt', new CustomJwtStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('github', new GitHubStrategy())
  authentication.register('google', new GoogleStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
