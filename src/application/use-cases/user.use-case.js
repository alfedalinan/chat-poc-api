const axios = require('axios')
const config = require('../../shared/config')
const { formatUseCaseError } = require('../lib/formatters')

async function create(input) {
    const result = await axios.post(`${config.MS_USERS}/users`, input)
                              .catch(error => formatUseCaseError(error))
    return result.data
}

async function update(id, input) {

    const result = await axios.patch(`${config.MS_USERS}/users/${id}`, input)
                              .catch(error => formatUseCaseError(error))

    return result.data.length > 0 && result.data[0] === 1 ? { id, ...input } : null
}

async function remove(id) {

    const result = await axios.delete(`${config.MS_USERS}/users/${id}`)
                              .catch(error => formatUseCaseError(error))

    return result.data && result.data > 0 ? true : false 
}

async function getById(id) {
    return { id }
}

async function getAll() {
    return [{ id: 1, username: 'alfed.alinan' }]
}

module.exports = {
    create,
    update,
    remove,
    getById,
    getAll
}