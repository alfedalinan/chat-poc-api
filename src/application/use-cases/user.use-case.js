
async function create(input) {
    
    return { ...input }
}

async function update(id, input) {

    return { id, ...input }
}

async function remove(id) {

    return 1 
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