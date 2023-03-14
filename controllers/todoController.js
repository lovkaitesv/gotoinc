const todoService = require('../services/todoService')
const ApiError = require("../exceptions/ApiError")

class TodoController {
    async create(req, res, next) {
        try {
            const {text, isCompleted, userId, group, subtasks} = req.body
            const item = await todoService.create(text, isCompleted, userId, group, subtasks)
            if (item) {
                return res.status(200).json(item)
            } else {
                return next(ApiError.BadRequest('Problem occurred while creating task'))
            }
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const item = await todoService.getOne(id)
            return res.status(200).json(item)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.query
            const todos = await todoService.getAll(userId)
            return res.status(200).json(todos)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {text, isCompleted, group, subtasks} = req.body
            const todo = await todoService.update(id, text, isCompleted, group, subtasks)
            if (todo) {
                return res.status(200).send({message: 'Task updated successfully'})
            } else {
                return next(ApiError.BadRequest('Problem occurred while updating task'))
            }
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const todo = await todoService.delete(id)
            if (todo) {
                return res.status(200).send({message: 'Task deleted successfully'})
            } else {
                return next(ApiError.BadRequest('Problem occurred while deleting task'))
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TodoController()