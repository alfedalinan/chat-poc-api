const merge = require('lodash.merge')
const userResolver = require('./user')
const conversationResolver = require('./conversation')

module.exports = merge(
    userResolver,
    conversationResolver
)