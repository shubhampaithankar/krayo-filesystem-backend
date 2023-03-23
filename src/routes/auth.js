require('../strategies/google')
const { Router } = require('express')
const passport = require('passport')
const router = Router()

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/auth/login/success',
    failureRedirect: '/auth/login/faliure'
}))

router.get('/login/success', (req, res) => {
    req.user ?
        res.status(200).send({ user: req.user }) :
        res.status(401).send({ message: 'Unauthorized' })
})

router.get('/login/failure', (req, res) => {
    res.send({ ack: 0, message: 'There was an error' })
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err) 
        req.session.destroy()
        res.redirect('http://localhost:3000/')
      })
})

module.exports = router