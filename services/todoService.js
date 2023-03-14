const {Todo, Group, Subtask} = require("../models/models")

class TodoService {
    async create(text, isCompleted, userId, group, subtasks) {
        let todo
        if (!group) {
            todo = await Todo.create({
                text,
                isCompleted,
                userId,
                groupId: 1
            })
        } else {
            let itemGroup = await Group.findOne({where: {name: group}})
            todo = await Todo.create({
                text,
                isCompleted,
                userId,
                groupId: itemGroup.id
            })
        }
        if (subtasks) {
            await subtasks.forEach(subtask => Subtask.create({
                text: subtask.text,
                isCompleted: subtask.isCompleted,
                todoId: todo.id
            }))
        }
        return todo
    }

    async getOne(id) {
        const todo = await Todo.findOne({where: {id}})
        const subtasks = await Subtask.findAll({where: {todoId: id}})
        return {todo, ...subtasks}
    }

    async getAll(userId) {
        const todos = await Todo.findAll({where: {userId}})
        return todos
    }

    async update(id, text, isCompleted, group, subtasks) {
        let todo
        if (!group) {
            todo = await Todo.update({
                text,
                isCompleted
            }, {where: {id}})
        } else {
            let itemGroup = await Group.findOne({where: {name: group}})
            todo = await Todo.update({
                text,
                isCompleted,
                groupId: itemGroup.id
            }, {where: {id}})
        }
        if (subtasks) {
            await subtasks.forEach(subtask => Subtask.create({
                text: subtask.text,
                isCompleted: subtask.isCompleted,
                todoId: todo.id
            }))
        }
        return todo
    }

    async delete(id) {
        let todo
        const subtasks = await Subtask.findAll({where: {todoId: id}})
        if (subtasks) {
            await subtasks.forEach(subtask => Subtask.destroy({where: {id: subtask.id}}))
            todo = await Todo.destroy({where: {id}})
        } else {
            todo = await Todo.destroy({where: {id}})
        }
        return todo
    }
}

module.exports = new TodoService()