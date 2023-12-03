"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const auth = require('../controllers/authController')


// URL: /auth

router.post('/login', auth.login)
router.post('/register', auth.register)
router.get('/logout', auth.logout)

/* ------------------------------------------------------- */
module.exports = router