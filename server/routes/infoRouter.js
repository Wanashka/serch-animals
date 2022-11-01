const Router = require('express')
const infoController = require('../controllers/infoController')
const router = new Router()

router.post('/',  infoController.create)
router.get('/', infoController.getAll)
router.get('/:id', infoController.getOne)
// router.get('/byAnimalId/:id', infoController.getAnimalComments)
//router.delete('/', infoController.deleteOne)


module.exports = router