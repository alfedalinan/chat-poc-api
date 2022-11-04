const axios = require('axios')
const config = require('../../shared/config')
const { formatUseCaseError } = require('../lib/formatters')

async function getUnreadMessagesByDestinationUserId(toMemberId) {
    const result = await axios.get(`${config.MS_CONVERSATIONS}/messages/unread/to-member-id/${toMemberId}`)
                              .catch(error => formatUseCaseError(error))
    return result.data
}

module.exports = {
    getUnreadMessagesByDestinationUserId
}