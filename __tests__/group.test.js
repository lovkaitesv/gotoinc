const request = require('supertest')
const baseURL = "http://localhost:5000"

describe("/todo", () => {
    const group = {
        name: "test group",
    }
    const user = {
        username: "name3",
        password: "somepass"
    }
    let token
    let id
    let userid
    beforeAll(async () => {
        await request(baseURL).post('/user/registration').send(user)
        const res = await request(baseURL).post('/user/login').send(user)
        token = res.body.accessToken
        userid = res.body.user.id
    })

    test('Create todo', async () => {
        const res = await request(baseURL).post('/group').send(group).set({authorization: `Bearer ${token}`})
        id = res.body.id
        expect(res.statusCode).toBe(200)
    })
    test('Get one todo', async () => {
        const res = await request(baseURL).get(`/group/${id}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Get all todo', async () => {
        const res = await request(baseURL).get(`/group?userId=${userid}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Update todo', async () => {
        const res = await request(baseURL).put(`/group/${id}`).send(group).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Delete todo', async () => {
        const res = await request(baseURL).delete(`/group/${id}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
})