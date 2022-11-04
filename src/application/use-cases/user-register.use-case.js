const axios = require('axios')
const config = require('../../shared/config')
const { formatUseCaseError } = require('../lib/formatters')

async function create(data) {
    const result = await axios.post(`${config.MS_USERS}/user-registers`, data)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

async function findOneByUserId(userId) {
    const result = await axios.get(`${config.MS_USERS}/user-registers/user-id/${userId}`)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

async function updateByUserId(userId, data) {
    const result = await axios.patch(`${config.MS_USERS}/user-registers/user-id/${userId}`, data)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

module.exports = {
    create,
    findOneByUserId,
    updateByUserId
}