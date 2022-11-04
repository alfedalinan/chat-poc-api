const SocketIO = require('socket.io')
const { userRegisterUseCases } = require('../../application/use-cases')
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
            
            sessions[data.registerId] = socket.id
            
            let acknowledgementData = {
                ...data,
                sessions
            }

            io.emit('user.register:ack', acknowledgementData)
        })
    })
}

const getSocketInstance = () => {
    return io
}

module.exports = { initializeSocket, getSocketInstance }