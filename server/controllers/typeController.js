const { Type } = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        // await Type.update({ name: "" }, { where: { id: 1 } })
        return res.json(type)
    }

    async update(req, res) {
        const { id, name } = req.body
        const result = await Type.update({ name }, { where: { id } })
        return res.json(result)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async deleteOne(req, res) {
        const { id } = req.body
        const types = await Type.destroy(
            {
                where: { id },
            },
        )
        return res.json(types)
    }
}

module.exports = new TypeController()