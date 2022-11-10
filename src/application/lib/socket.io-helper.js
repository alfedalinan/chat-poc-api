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
        /** REGISTER */
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

        /** UNREGISTER */
        socket.on('user.unregister:send', async (data) => {
            userRegisterUseCases.removeByUserId(data.userId)
                .then((response) => {
                    delete sessions[data.registerId]
                    io.emit('user.unregister:ack', data)
                })
        })
    
    
        /** MESSAGE.SEND */
        /**
         * msg_uuid, 
            conversation_id, 
            text, 
            sender_user_id, 
            receiver_user_id,
            sender_register_id,
            receiver_register_id

         */
        socket.on('message.send:send', (data) => {
            // set data
            let messageData = {
                conversationId: data.conversationId,
                text: data.text,
                fromMemberId: data.fromMemberId,
                toMemberId: data.toMemberId,
                uuid: data.uuid,
                status: data.status
            }
            
            messageUseCases.create(messageData)
            .then(response => {
                // emit back to sender to ack
                io.to(sessions[data.senderRegisterId]).emit('message.send:ack', {
                    msgId: response.id,
                    msgUuid: response.uuid,
                    conversationId: response.conversationId,
                    senderUserId: response.fromMemberId,
                    receiverUserId: response.toMemberId,
                    senderRegisterId: data.senderRegisterId,
                    receiverRegisterId: data.receiverRegisterId,
                    text: data.text,
                    createdAt: response.createdAt,
                    updatedAt: null,
                    status: 0,
                    additional: data.hasOwnProperty('senderUsername') ? {
                        senderFirstName: data.senderFirstName,
                        senderLastName: data.senderLastName,
                        senderUsername: data.senderUsername,
                        senderEmail: data.senderEmail,
                    } : {}
                })

                socket.broadcast.to(sessions[data.receiverRegisterId]).emit('message.receive:send', {
                    msgId: response.id,
                    msgUuid: data.msg_uuid,
                    text: data.text,
                    conversationId: data.conversation_id,
                    senderUserId: data.senderUserId,
                    receiverUserId: data.receiverUserId,
                    senderRegisterId: data.senderRegisterId,
                    receiverRegisterId: data.receiverRegisterId,
                    createdAt: messageData.createdAt,
                    updatedAt: null,
                    status: 0,
                    additional: data.hasOwnProperty('senderUsername') ? {
                        receiverFirstName: data.senderFirstName,
                        receiverLastName: data.senderLastName,
                        receiverUsername: data.senderUsername,
                        receiverEmail: data.senderEmail,
                    } : {}

                })
            })
        })

        /** MESSAGE.STATUS.DELIVERED FROM RECEIVER */
        socket.on('message.status.delivered:send', (data) => {

            messageUseCases.setToDeliveredByUuid(data.uuid)
            .then(response => {
                socket.broadcast.to(sessions[data.sender_register_id]).emit('message.status.delivered:ack', {
                    text: data.text,
                    msgUuid: data.uuid,
                    conversationId: data.conversationId,
                    senderRegisterId: data.senderRegisterId,
                    receiverRegisterId: data.receiverRegisterId
                })
            })
    
        })
    
    })
}

const getSocketInstance = () => {
    return io
}

module.exports = { initializeSocket, getSocketInstance }