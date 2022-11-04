const SocketIO = require('socket.io')
const { userRegisterUseCases, messageUseCases } = require('../../application/use-cases')
let io

const initializeSocket = (server) => {
    io = SocketIO(server, {
        cors: {
            origin: '*'
        }
    })

    let sessions = {}

    io.on('connection', (socket) => {
        
        socket.on('user.register:send', async (data) => {
            let userWithRegister = await userRegisterUseCases.findOneByUserId(data.userId)

            if (userWithRegister) {
                await userRegisterUseCases.updateByUserId(data.userId, data)
            }
            else {
                await userRegisterUseCases.create(data)
            }
            
            let unreadMessages = await messageUseCases.getUnreadMessagesByDestinationUserId(data.userId)
            
            let unreadItems = {
                deliveredUserId: data.userId,
                deliveredRegisterId: data.registerId,
                conversations: unreadMessages.map(m => m.conversationId),
                messages: unreadMessages.map(m => m.id),
                messageUuids: unreadMessages.map(m => m.uuid)
            }

            unreadItems.conversations = unreadItems.conversations.filter((item, pos) => {
                return unreadItems.conversations.indexOf(item) == pos
            })

            sessions[data.registerId] = socket.id
            
            let acknowledgementData = {
                ...data,
                sessions
            }

            io.emit('message.broadcast:delivered', unreadItems)
            io.emit('user.register:ack', acknowledgementData)
        })
    })
}

const getSocketInstance = () => {
    return io
}

module.exports = { initializeSocket, getSocketInstance }