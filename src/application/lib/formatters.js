const { ApolloError } = require('apollo-server')
const { errorMessages } = require('../../shared/constants')

const formatError = (error) => {
    const { message, extensions } = error
    
    if (extensions.code === 'GRAPHQL_VALIDATION_FAILED' || extensions.code === 'BAD_USER_INPUT') {
      return {
        message: errorMessages.ERR0002,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else if (extensions.code === 'UNAUTHENTICATED') {
      return {
        message,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else if (extensions.code === 'GRAPHQL_PARSE_FAILED') {
      return {
        message: errorMessages.ERR0003,
        extensions: {
          details: message,
          code: extensions.code,
          exception: extensions.exception
        }
      }
    }
    else {
      return error
    }
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

const formatUseCaseError = (error) => {
  console.log(JSON.stringify(error, null, 2))
}

module.exports = { formatError, formatResponse, formatUseCaseError }