const uuid = require('uuid')
const path = require('path');
const { Animal } = require('../models/models')
const ApiError = require('../error/ApiError');

class AnimalController {
    async create(req, res, next) {
        try {
            let { name, phone, categoryId, breedId, typeId, description, coords } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const animal = await Animal.create({ name, phone, categoryId, breedId, typeId, img: fileName, description, coords: JSON.parse(coords) });

            return res.json(animal)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { categoryId, breedId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let animal;
        if (!breedId && !typeId && !categoryId) {
            animal = await Animal.findAndCountAll({ limit, offset })
        }
        if (breedId && !typeId && !categoryId) {
            animal = await Animal.findAndCountAll({ where: { breedId }, limit, offset })
        }
        if (!breedId && typeId && !categoryId) {
            animal = await Animal.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (!breedId && !typeId && categoryId) {
            animal = await Animal.findAndCountAll({ where: { categoryId }, limit, offset })
        }
        if (breedId && typeId && !categoryId) {
            animal = await Animal.findAndCountAll({ where: { breedId, typeId }, limit, offset })
        }
        if (breedId && !typeId && categoryId) {
            animal = await Animal.findAndCountAll({ where: { breedId, categoryId }, limit, offset })
        }
        if (!breedId && typeId && categoryId) {
            animal = await Animal.findAndCountAll({ where: { typeId, categoryId }, limit, offset })
        }
        if (breedId && typeId && categoryId) {
            animal = await Animal.findAndCountAll({ where: { breedId, typeId, categoryId }, limit, offset })
        }
        return res.json(animal)
    }

    async getOne(req, res) {
        const { id } = req.params
        const animal = await Animal.findOne(
            {
                where: { id },
            },
        )
        return res.json(animal)
    }
    async deleteOne(req, res) {
        const { id } = req.body
        const animal = await Animal.destroy(
            {
                where: { id },
            },
        )
        return res.json(animal)
    }
}

module.exports = new AnimalController()
