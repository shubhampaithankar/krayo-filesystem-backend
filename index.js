require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const fileUpload = require('express-fileupload')

const router = require('./src/router')

const app = express()
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST',
    credentials: true
}))
app.use(fileUpload())
app.use('/', router)

app.listen(3001, () => console.log(`started on port 3001`))