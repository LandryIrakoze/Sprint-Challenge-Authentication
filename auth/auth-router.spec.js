const Users = require('./auth-model');
const db = require('../database/dbConfig');
const server = require('../api/server')
const request = require('supertest');

describe('POST /register', () => {
    it('returns status code 400 if you try to register with taken user credentials', () => {
        return (
            request(server)
                .post('/api/auth/register')
                .send({ username: "user", password: "pass" })
                .expect(400)
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