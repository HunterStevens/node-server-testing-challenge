const supertest = require('supertest');
const server = require('../server');
const bookRouter = require('../books/booksRouter');
const db = require('../data/dbConfig');

describe('server', () =>{
    describe('GET /', ()=>{
        test('should return the api messge', ()=>{
            return supertest(server).get('/').then(res =>{
                expect(res.body.api).toBeDefined();
            })
        })
    })
})

describe('booksRouter',()=>{
    describe('POST /api/books', ()=>{
        test('should return a whole new book when filled in correctly', ()=>{
            const insert = {
                title:'test keeping',
                author:'some bald guy'
            }
            supertest(bookRouter).post('/').send(insert).then(res =>{
                expect(res.body.title).toBeDefined();
                expect(res.body.fake).toBeDefined();
                expect(res.body.id).toBeDefined();
            })
        })
        test('should return an error if certain credentials are not put in', ()=>{
            const insertOne = {
                title:'no author'
            }
            const insertTwo = {
                author:'no title'
            }
            supertest(bookRouter).post('/').send(insertOne).then(res =>{
                expect(res.body).toStrictEqual({error:'credentials arent filled in to make a new book'})
            })
            supertest(bookRouter).post('/').send(insertTwo).then(res =>{
                expect(res.body.author).toBeDefined();
            })
        })
    })
})