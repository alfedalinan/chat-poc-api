const merge = require('lodash.merge')
const userResolver = require('./user')

module.exports = merge(
    userResolver
)