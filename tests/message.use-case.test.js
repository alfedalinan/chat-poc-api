const { messageUseCases } = require('../src/application/use-cases')

describe('Message Use Case', () => {

    it('Get Unread By Destination User ID', async () => {
        let toMemberId = 1
        const result = await messageUseCases.getUnreadMessagesByDestinationUserId(toMemberId)
        
        expect(result).toBeTruthy()
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

})