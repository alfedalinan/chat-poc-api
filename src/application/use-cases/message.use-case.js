const axios = require('axios')
const config = require('../../shared/config')
const { formatUseCaseError } = require('../lib/formatters')

async function getUnreadMessagesByDestinationUserId(toMemberId) {
    const result = await axios.get(`${config.MS_CONVERSATIONS}/messages/unread/to-member-id/${toMemberId}`)
                              .catch(error => formatUseCaseError(error))
    return result.data
}

async function create(data) {
    const result = await axios.post(`${config.MS_CONVERSATIONS}/messages`, data)
                              .catch(error => formatUseCaseError(error))
    
    return result.data
}

async function setToDeliveredByUuid(uuid) {
    const result = await axios.patch(`${config.MS_CONVERSATIONS}/messages/set-to-delivered/${uuid}`)
                              .catch(error => formatUseCaseError(error))

    return result.data
}

module.exports = {
    getUnreadMessagesByDestinationUserId,
    create,
    setToDeliveredByUuid
}