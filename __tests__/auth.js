const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

//run the seeds before every single test, so each one can have a fresh start
beforeEach(async () => {
    await db.seed.run()
})

//this is a jest hook that will run after all the tests in this file have run
afterAll(async () => {
    //close the db connection before the test runner ends to prevent any warnings about leaks
    await db.destroy()
})

describe('auth tests', () =>{
    it('creates a user', async () => {
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({username: 'becky', password: 'password'})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.id).toBeDefined()
    })
})