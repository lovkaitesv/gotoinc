const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const groupRouter = require('./groupRouter')



router.use('/user', userRouter)
router.use('/todo', todoRouter)
router.use('/group', groupRouter)
module.exports = router