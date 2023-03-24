const { Router } = require('express')
const router = Router()

const authRouter = require('./routes/auth')
const fileRouter = require('./routes/files')

const isLoggedIn = (req, res, next) => req.user ? next() : res.status(401).send({ message: 'Unauthorized' })

router.use('/auth', authRouter)
router.use('/file', isLoggedIn, fileRouter)

module.exports = router