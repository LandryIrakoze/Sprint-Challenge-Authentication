const db = require('../database/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users')
        .select('username', 'password')
}
function findBy(filter) {
    return db('users')
        .where(filter)
}
function findById(id) {
    return db('users')
        .where({ id })
        .first()
}
function add(user) {
    return db('users')
        .insert(data, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}