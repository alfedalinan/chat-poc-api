const axios = require('axios')
const host = 'http://localhost:3200/graphql'

describe('User E2E', () => {

    it('Create E2E', async () => {
        const response = await axios.post(host, {
            query: `
            mutation {
                createUser(input: {
                    username: "alfed.alinan",
                    password: "someKindOfPassword",
                    firstName: "Alfed",
                    lastName: "Alinan",
                    email: "alfed.alinan@test.com"
                }) {
                    id
                    username
                    password
                    firstName
                    lastName
                    email
                }
            }
            `
        })

        const result = response.data.data.createUser
        
        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
        expect(result.firstName).toBeTruthy()
        expect(result.lastName).toBeTruthy()
        expect(result.username).toBeTruthy()
        expect(result.email).toBeTruthy()

    })

})