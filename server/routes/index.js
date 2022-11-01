const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const breedRouter = require('./breedRouter')
const typeRouter = require('./typeRouter')
const categoryRouter = require('./categoryRouter')
const animalRouter = require('./animalRouter')
const infoRouter = require('./infoRouter')

router.use('/user', userRouter)
router.use('/animal', animalRouter)
router.use('/type', typeRouter)
router.use('/breed', breedRouter)
router.use('/category', categoryRouter)
router.use('/comment', infoRouter)

module.exports = router
