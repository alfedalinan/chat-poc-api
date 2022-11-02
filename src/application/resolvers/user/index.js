const { userUseCases } = require("../../use-cases");
const resolve = require('../../lib/resolve')

async function createUser(parent, args, context, info) {
    const result = await userUseCases.create(args.input)
    return result
}

async function updateUser(parent, args, context, info) {
    const result = await userUseCases.update(args.id, args.input)
    return result
}

async function removeUser(parent, args, context, info) {
    const result = await userUseCases.remove(args.id)
    return result
}

async function getById(parent, args, context, info) {
    const result = await userUseCases.getById(args.id)
    return result
}

async function getAll(parent, args, context, info) {
    const result = await userUseCases.getAll()
    return result
}

module.exports = {
    Query: {
        getById: resolve(getById, { isPrivate: false }),
        getAll:  resolve(getAll, { isPrivate: false })
    },
    Mutation: {
        createUser: resolve(createUser, { isPrivate: false }),
        updateUser: resolve(updateUser, { isPrivate: false }),
        removeUser: resolve(removeUser, { isPrivate: false })
    }
}