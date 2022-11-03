const { gql } = require('apollo-server')
const readTypeDefs = require('../lib/read-type-defs')
const userTypeDefs = readTypeDefs(`${__dirname}/user`)
const conversationTypeDefs = readTypeDefs(`${__dirname}/conversation`)

const typeDefs = gql`
    type Query
    type Mutation
    ${userTypeDefs}
    ${conversationTypeDefs}
`

module.exports = typeDefs