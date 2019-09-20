const Users = require('./auth-model');
const db = require('../database/dbConfig');
const server = require('../api/server')
const request = require('supertest');

describe('POST /register', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('returns status code 200 with correctly inputed information', () => {
        return (
            request(server)
                .post('/api/auth/register')
                .send({ username: "user", password: "pass" })
                .expect(200)
        )
    })
    it('returns status code 500 if you try to post without user information', () => {
        return (
            request(server)
                .post('/api/auth/register')
                .expect(500)
        )
    })
})

describe('POST /login', () => {
    it('returns status code 200 with correctly inputed information', () => {
        return (
            request(server)
                .post('/api/auth/login')
                .send({ username: "user", password: "pass" })
                .expect(200)
        )
    })
    it('returns status code 500 if you try to post without user information', () => {
        return (
            request(server)
                .post('/api/auth/login')
                .expect(500)
        )
    })
})