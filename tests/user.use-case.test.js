const { userUseCases } = require('../src/application/use-cases')

describe('User Use Cases', () => {
    
    it('Create', async () => {

        let input = {
            username: 'alfed.alinan',
            email: 'alfed.alinan@email.com',
            password: 'someKindOfPassword',
            firstName: 'Alfed',
            lastName: 'Alinan'
        }

        const created = await userUseCases.create(input)

        expect(created).toBeTruthy()
        expect(created.username).toBeTruthy()
    })

    it('Get By ID', async () => {
        const id = 1

        const result = await userUseCases.getById(id)

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
    })

    it('Get All', async () => {
        const result = await userUseCases.getAll()
        expect(result).toBeTruthy()
        expect(result.length).toBeTruthy()
    })

    it('Update', async () => {
        const id = 1

        const data = {
            firstName: "Alfeds",
            lastName: "Al",
            username: "alfeds.al",
            email: "alfeds.al@test.com",
            password: "someKindOfPassword"
        }

        const result = await userUseCases.update(id, data)

        expect(result).toBeTruthy()
        expect(result.id).toBeTruthy()
        expect(result.username).toBeTruthy()
        expect(result.email).toBeTruthy()
        expect(result.firstName).toBeTruthy()
        expect(result.lastName).toBeTruthy()
    })

    it('Delete', async () => {
        const id = 1
        const result = await userUseCases.remove(id)

        expect(result).toBeTruthy()
        expect(typeof result).toBe('boolean')

    })
})