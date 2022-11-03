const { conversationUseCases } = require('../src/application/use-cases')

describe('Conversation Use Case', () => {
    let userId
    let id
    it('Create', async () => {
        let input = {
            name: 'My Conversation',
            userId: 1,
            userRegister: '123456-poiuytr-xxxxx'
        }

        const result = await conversationUseCases.create(input)

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()

        userId = result.userId
        id = result.id
    })

    it('Get All By User ID', async () => {
        const result = await conversationUseCases.getAllByUserId(userId)
        
        expect(result.length).toBeTruthy()
        expect(result[0].conversationMembers).toBeTruthy()
    })

    it('Get By ID', async() => {
        const result = await conversationUseCases.getById(id)

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
    })

    it('Update', async () => {
        let input = {
            name: 'My Updated Conversation',
            userId: 1,
            userRegister: '123456-poiuytr-ycyrsd'
        }
        const result = await conversationUseCases.update(id, input)

        expect(result).toBeTruthy()
        expect(result.length).toBeTruthy()
        expect(result[0]).toBeGreaterThanOrEqual(0)
    })

    it('Remove', async () => {
        const result = await conversationUseCases.remove(id)
        expect(result).toBeTruthy()
    })
})