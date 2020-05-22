const supertest = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');

afterAll(async ()=>{
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

describe('booksRouter',()=>{
    describe('POST /api/books', ()=>{
        test('should return a whole new book when filled in correctly', () => {
            const insert = {
                title:'test keeping',
                author:'some bald guy'
            }
            supertest(server).post('/api/books').send(insert).then(res =>{
                expect(res.req.data.title).toEqual('test keeping');
                expect(res.req.data.author).toEqual('some bald guy');
                expect(res.req.data.author).toBeDefined();
            })
        })
        test('should return an error if certain credentials are not put in', ()=>{
            const insertOne = {
                title:'no author'
            }
            const insertTwo = {
                author:'no title'
            }
            supertest(server).post('/api/books').send(insertOne).then(res =>{
                expect(res.body).toStrictEqual({error:'credentials arent filled in to make a new book'})
            })
            supertest(server).post('/api/books').send(insertTwo).then(res =>{
                expect(res.body).toStrictEqual({error:'credentials arent filled in to make a new book'})
            })
        })
    })
    describe('DELETE /api/books/:id', ()=>{
        test('Should successfully delete book based on valid id',()=>{
            supertest(server).delete('/api/books/1').then(res =>{
                expect(res).toEqual('deleted');
            })
        })
    })
})