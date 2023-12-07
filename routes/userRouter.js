"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const permissions = require("../middlewares/permissions")
const user = require('../controllers/userController')

// URL: /users

router.use(permissions.isOwner)

router.route('/')
    .get( user.list)
    .post( user.create)

router.route('/:id')
    .get( user.read)
    .put( user.update)
    .patch( user.update)
    .delete( user.delete)

/* ------------------------------------------------------- */
module.exports = router