const { AuthenticationError, ApolloError } = require('apollo-server')
const { errorMessages } = require('./constants')

const handleError = error => {
    if (error instanceof ApolloError) {
      throw error
    }
  
    const message = error.data && error.data.message || error.message
    const code = error.data && error.data.errorCode || error.errorCode
  
    throw new ApolloError(message, code, {
      errorData: error.data && error.data.data || error.data
    })
}

const validateToken = async ({ headers = {} } = {}, info = {}) => {
    
    if (!headers.authorization) {
      throw new AuthenticationError(errorMessages.ERR0003)
    }
    
    const token = headers.authorization.replace('Bearer ', '')

    const claims = {}

    if (claims) {
      return claims
    }
    else {
      throw new AuthenticationError(errorMessages.ERR0004)
    }
}

const resolve = async (resolver, settings, ...args) => {
    const { isPrivate = false } = settings || {}
    const [,, context, info] = args
  
    if (isPrivate) {
      Object.assign(context, { user: await validateToken(context, info) })
    }
  
    try {
      return await resolver(...args)
    } catch (error) {
      handleError(error)
    }
}

module.exports = (resolver, settings = {}) => async (...args) => await resolve(resolver, settings, ...args)
