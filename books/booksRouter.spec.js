const supertest = require('supertest');
const server = require('../server');
const bookRouter = require('../books/booksRouter');
const db = require('../data/dbConfig');

afterEach(async ()=>{
    await db('books').truncate();
})

describe('server', () =>{
    describe('GET /', ()=>{
        test('should return the api messge', ()=>{
            return supertest(server).get('/').then(res =>{
                expect(res.body.api).toBeDefined();
            })
        })
    })
})