const groupService = require('../services/groupService')

class GroupController {
    async create(req, res, next) {
        try {
            const {name, userId} = req.body
            const group = await groupService.create(name, userId)
            return res.status(200).json(group)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const group = await groupService.getOne(id)
            return res.status(200).json(group)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.query
            const groups = await groupService.getAll(userId)
            return res.status(200).json(groups)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body
            await groupService.update(id, name)
            return res.status(200).send({message: 'Group updated successfully'})
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await groupService.delete(id)
            return res.status(200).send({message: 'Group deleted successfully'})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GroupController()