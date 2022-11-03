const axios = require('axios')
const config = require('../../shared/config')
const { formatUseCaseError } = require('../lib/formatters')

async function create(input) {
    const result = await axios.post(`${config.MS_CONVERSATIONS}/conversations`, input)
                              .catch(error => formatUseCaseError(error))
    return result.data
}

async function getAllByUserId(userId) {
    const result = await axios.get(`${config.MS_CONVERSATIONS}/conversations/user-id/${userId}`)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

async function getById(id) {
    const result = await axios.get(`${config.MS_CONVERSATIONS}/conversations/${id}`)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

async function update(id, input) {
    const result = await axios.patch(`${config.MS_CONVERSATIONS}/conversations/${id}`, input)
                              .catch(error => formatUseCaseError(error))
    
    return result.data
}

async function remove(id) {
    const result = await axios.delete(`${config.MS_CONVERSATIONS}/conversations/${id}`)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

module.exports = {
    create,
    getAllByUserId,
    getById,
    update,
    remove
}