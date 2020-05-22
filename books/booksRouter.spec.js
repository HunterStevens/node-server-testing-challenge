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
        test('should return a whole new book when filled in correctly', async() => {
            const res = await supertest(server).post('/api/books').send({title:'test keeping',
                author:'some bald guy'})
                expect(res.body.data[0].title).toEqual('test keeping');
                expect(res.body.data[0].author).toEqual('some bald guy');
        })
        test('should return an error if certain credentials are not put in', ()=>{
            const insertOne = {
                title:'no author'
            }
            const insertTwo = {
                author:'no title'
            }
            supertest(server).post('/api/books').send(insertOne).then(res =>{
                expect(res.body).toStrictEqual({error:'credentials arent filled in to make a new book'});
            })
            supertest(server).post('/api/books').send(insertTwo).then(res =>{
                expect(res.body).toStrictEqual({error:'credentials arent filled in to make a new book'});
            })
        })
    })
    describe('DELETE /api/books/:id', ()=>{
        test('Should successfully delete book based on valid id', async()=>{
            const res = await supertest(server).delete('/api/books/1')
                expect(res.body.message).toEqual('book was removed');
        })
        test('Should return an error with an invalid id', async() =>{
            const res = await supertest(server).delete('/api/books/000')
            expect(res.body.message).toEqual("Could not find book with that id");
        })
    })
})