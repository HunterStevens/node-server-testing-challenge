const db = require('../data/dbConfig');

module.exports={
    getAll,
    getById,
    addBook,
    deleteBook
}

function getAll(){
    return db('books');
}
function getById(id){
    return db('books').where({id});
}

function addBook(newBook){
    return db('books').insert(newBook)
    .then(([newId]) =>{
        return getById(newId);
    });
}

function deleteBook(id){
    return db('books').where({id}).del();
}