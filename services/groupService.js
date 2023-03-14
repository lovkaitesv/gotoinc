const {Group} = require("../models/models")

class GroupService {
    async create(name, userId) {
        const group = await Group.create({name, userId})
        return group
    }

    async getOne(id) {
        const group = await Group.findOne({where: {id}})
        return group
    }

    async getAll(userId) {
        const groups = await Group.findAll({where: {userId}})
        return groups
    }

    async update(id, name) {
        const group = await Group.update({
            name
        }, {where: {id}})
        return group
    }

    async delete(id) {
        await Group.destroy({where: {id}})
    }
}

module.exports = new GroupService()