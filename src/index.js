const { ApolloServer } = require('apollo-server')
const typeDefs = require('./application/typedefs')
const resolvers = require('./application/resolvers')
const context = require('./application/lib/build-context')
const { initializeSocket, getSocketInstance } = require('./application/lib/socket.io-helper')
const config = require('./shared/config')
const { formatResponse, formatError } = require('./application/lib/formatters')
const http = require('http')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    debug: config.DEBUG === 'true',
    formatResponse,
    formatError
})

server.listen({ port: config.SERVER_PORT })
      .then(({ url }) => {
        console.log(`Running at ${url}`)
      })

const socketServer = http.createServer(server)
socketServer.listen(config.SOCKET_PORT)
initializeSocket(socketServer)

const socketInstance = getSocketInstance()

module.exports = { server, socketInstance }
