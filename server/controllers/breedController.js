const {Breed, Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class BreedController {
    async create(req, res) {
        const {name, typeId} = req.body
        const breed = await Breed.create({name, typeId})
        return res.json(breed)
    }

    async getAll(req, res) {
        const breeds = await Breed.findAll()
        return res.json(breeds)
    }

    async getByType(req, res) {
        const { type } = req.params
        const breeds = await Breed.findAll({ where: { typeId: type } })
        return res.json(breeds)
    }

    async deleteOne(req, res) {
        const { id } = req.body
        const breeds = await Breed.destroy(
            {
                where: { id },
            },
        )
        return res.json(breeds)
    }
}

module.exports = new BreedController()
