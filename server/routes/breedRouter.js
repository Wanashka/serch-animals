const Router = require('express')
const router = new Router()
const breedController = require('../controllers/breedController')

router.post('/', breedController.create)
router.get('/', breedController.getAll)
router.get('/byType/:type', breedController.getByType)
router.delete('/', breedController.deleteOne)


module.exports = router
