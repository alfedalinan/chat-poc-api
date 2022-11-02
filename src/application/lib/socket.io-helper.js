const SocketIO = require('socket.io')
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
            console.log('the data is: ', data)
        })

        io.emit('message.broadcast:delivered', [1,2,3,4]);
        io.emit('user.register:ack', { test: 'data' });
    })
}

const getSocketInstance = () => {
    return io
}

module.exports = { initializeSocket, getSocketInstance }