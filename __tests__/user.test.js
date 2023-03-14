const request = require('supertest')
const {User} = require("../models/models")
const baseURL = "http://localhost:5000/user"

describe("/user", () => {
    const user = {
        username: "name1",
        password: "somepass"
    }
    let id
    let token

    test('Registration', async () => {
        const res = await request(baseURL).post('/registration').send(user)
        expect(res.statusCode).toBe(200)
    })
    test('Login', async () => {
        const res = await request(baseURL).post('/login').send(user)
        id = res.body.user.id
        token = res.body.refreshToken
        expect(res.statusCode).toBe(200)
    })
    test('Refresh', async () => {
        const res = await request(baseURL).get('/refresh').set('Cookie', `refreshToken=${token}`).send()
        expect(res.statusCode).toBe(200)
    })
    test('Logout', async () => {
        const res = await request(baseURL).post('/logout').set('Cookie', `refreshToken=${token}`).send()
        expect(res.statusCode).toBe(200)
    })
})