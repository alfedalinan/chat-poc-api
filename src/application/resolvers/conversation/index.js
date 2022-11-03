const { conversationUseCases } = require('../../use-cases')
const resolve = require('../../lib/resolve')

async function createConversation(parent, args, context, info) {
    const result = await conversationUseCases.create(args.input)
    return result
}

async function updateConversation(parent, args, context, info) {
    const result = await conversationUseCases.update(args.id, args.input)
    return result
}

async function removeConversation(parent, args, context, info) {
    const result = await conversationUseCases.remove(args.id)
    return result
}

async function getConversationById(parent, args, context, info) {
    const result = await conversationUseCases.getById(args.id)
    return result
}

async function getConversationsByUserId(parent, args, context, info) {
    const result = await conversationUseCases.getAllByUserId(args.userId)
    return result
}

module.exports = {
    Query: {
        getConversationById: resolve(getConversationById, { isPrivate: false }),
        getConversationsByUserId: resolve(getConversationsByUserId, { isPrivate: false })
    },
    Mutation: {
        createConversation: resolve(createConversation, { isPrivate: false }),
        updateConversation: resolve(updateConversation, { isPrivate: false }),
        removeConversation: resolve(removeConversation, { isPrivate: false })
    }
}