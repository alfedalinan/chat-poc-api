const axios = require('axios')
const host = 'http://localhost:3200/graphql'

describe('Conversations E2E', () => {
    let id
    let userId
    it('Create', async () => {
        const response = await axios.post(host, {
            query: `
                mutation {
                    createConversation(input: {
                        name: "My Conversation",
                        userId: 1,
                        userRegister: "123456-poiuytr-xxxxx"
                    }) {
                        id
                        name
                        userId
                        userRegister
                    }
                }
            `
        })

        const result = response.data.data.createConversation
        
        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()

        id = result.id
        userId = result.userId
    })
    
    it('Get All By User ID', async () => {
        const response = await axios.post(host, {
            query: `
                query {
                    getConversationsByUserId(userId: 1) {
                        id
                        name
                        userId
                        userRegister
                    }
                }
            `
        })

        const result = response.data.data.getConversationsByUserId

        expect(result.length).toBeTruthy()
        expect(result.length).toBeGreaterThanOrEqual(0)
    })

    it('Get By ID', async () => {
        const response = await axios.post(host, {
            query:`
                query {
                    getConversationById(id: ${id}) {
                        id
                        name
                        userId
                        userRegister
                        conversationMembers {
                            id
                            conversationId
                        }
                    }
                }
            `
        })

        const result = response.data.data.getConversationById
        console.log(result)
        expect(result).toBeTruthy()
        expect(result.conversationMembers).toBeTruthy()
        expect(result.conversationMembers.length).toBeGreaterThanOrEqual(0)
    })
    
    it('Update', async () => {
        const response = await axios.post(host, {
            query: `
                mutation {
                    updateConversation(id: ${id}, input: {
                        name: "My Updated Conversation",
                        userId: 1,
                        userRegister: "123456-poiuytr-xxxx1"
                    })
                }
            `
        })

        const result = response.data.data.updateConversation
        
        expect(result).toBeTruthy()
        expect(result.length).toBeTruthy()
        expect(result.length).toBeGreaterThanOrEqual(0)
        expect(typeof result[0]).toBe('number')
    })

    it('Delete', async () => {
        const response = await axios.post(host, {
            query: `
                mutation {
                    removeConversation(id: ${id})
                }
            `
        })

        const result = response.data.data.removeConversation

        expect(result).toBeTruthy()
        expect(typeof result).toBe('number')
        expect(result).toBeGreaterThanOrEqual(0)
    })
})