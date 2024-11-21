const express = require('express')
const router = express.Router()

const {register, login, currentUser} = require('../Controllers/Auth')
const {auth} = require('../Middleware/auth')
const {adminCheck} = require('../Middleware/auth')

router.post('/register', register)

router.post('/login', login)

router.post('/current-user',auth, currentUser)

router.post('/current-admin',auth,adminCheck, currentUser)

module.exports = router