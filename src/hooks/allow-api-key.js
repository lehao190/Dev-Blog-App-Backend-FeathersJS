// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { params } = context

    // const token =
    //   params.query[server.auth.apiKey.urlParam] ||
    //   params.headers[server.auth.apiKey.header]

    const token = 'Vergil' || 'Dante'

    if (token && params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'apiKey',
          token
        }
      }
    }

    // console.log('allow-key-api params : ')

    return context
  }
}
