const { ApolloError } = require('apollo-server')
const { errorMessages } = require('../../shared/constants')

const formatError = (error) => {
    const { message, extensions } = error
    
    if (extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
      return {
        message: errorMessages.ERR0002,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }

    return error
}

const formatResponse = (response) => {
    const { errors } = response
    if (errors) {
      for (let i = 0; i < errors.length; i++) {
        const error = errors[i];
        
        if (error.extensions.code === 'INTERNAL_SERVER_ERROR') {
          throw new ApolloError(errorMessages.ERR0001, error.code, {
            details: error.message
          })
        }
      }
    }

    return response
}

module.exports = { formatError, formatResponse }