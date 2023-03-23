const { Router } = require('express')
const router = Router()

const authRouter = require('./routes/auth')
router.use('/auth', authRouter)

const isLoggedIn = (req, res, next) => req.user ? next() : res.status(401).send({ message: 'Unauthorized' })

router.get('/api', isLoggedIn, (req, res) => {
    res.send(`Hello`)
})

module.exports = router