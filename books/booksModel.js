const db = require('../data/dbConfig');

module.exports={
    getAll,
    addBook,
    deleteBook
}

function getAll(){
    return db('books').
}