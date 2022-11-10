const { messageUseCases } = require('../src/application/use-cases')

describe('Message Use Case', () => {

    it('Get Unread By Destination User ID', async () => {
        let toMemberId = 1
        const result = await messageUseCases.getUnreadMessagesByDestinationUserId(toMemberId)
        
        expect(result).toBeTruthy()
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('Create Message', async () => {
        let data = {
            conversationId: 1,
            uuid: '12345-abcde-xyxyxy',
            fromMemberId: 1,
            toMemberId: 2,
            text: 'Hi! This is my first message!',
            status: 0
        }

        const result = await messageUseCases.create(data)

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
    })

    it('Set to Delivered Status Using UUID', async () => {
        let uuid = '12345-abcde-xyxyxy'

        const result = await messageUseCases.setToDeliveredByUuid(uuid)

        expect(result.length).toBeTruthy()
        expect(result.length).toBeGreaterThan(0)
    })
})