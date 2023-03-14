const request = require('supertest')
const baseURL = "http://localhost:5000"

describe("/todo", () => {
    const todo = {
        text: "test task",
        isCompleted: false,
    }
    const user = {
        username: "name4",
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
        const res = await request(baseURL).post('/todo').send(todo).set({authorization: `Bearer ${token}`})
        id = res.body.id
        expect(res.statusCode).toBe(200)
    })
    test('Get one todo', async () => {
        const res = await request(baseURL).get(`/todo/${id}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Get all todo', async () => {
        const res = await request(baseURL).get(`/todo?userId=${userid}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Update todo', async () => {
        const res = await request(baseURL).put(`/todo/${id}`).send(todo).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
    test('Delete todo', async () => {
        const res = await request(baseURL).delete(`/todo/${id}`).set({authorization: `Bearer ${token}`})
        expect(res.statusCode).toBe(200)
    })
})