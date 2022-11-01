const { AnimalInfo, Animal } = require('../models/models')
const ApiError = require('../error/ApiError');


class InfoController {
    async create(req, res) {
        const { avtor, info, animalId} = req.body

        // const { info } = req.body
        const comment = await AnimalInfo.create({ avtor , info, animalId })
        return res.json(comment)
    }

    async getAll(req, res) {
        const  comments= await AnimalInfo.findAll()
        return res.json(comments)
    }

    async getOne(req, res) {
        const { id } = req.params;
        const comments = await AnimalInfo.findAll({ where: { animalId: id } })
        return res.json(comments)
    }

}
module.exports = new InfoController()
