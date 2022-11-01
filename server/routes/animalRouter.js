const Router = require('express')
const router = new Router()
const animalController = require('../controllers/animalController')

router.post('/', animalController.create)
router.get('/', animalController.getAll)
router.get('/:id', animalController.getOne)
router.delete('/', animalController.deleteOne)

module.exports = router
