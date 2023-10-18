"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const permissions = require("../middlewares/permissions")
const user = require('../controllers/userController')

// URL: /users

router.route('/')
    .get(permissions.isOwner, user.list)
    .post(user.create)

router.route('/:id')
    .get(permissions.isLogin, user.read)
    .put(permissions.isLogin, user.update)
    .patch(permissions.isLogin, user.update)
    .delete(permissions.isOwner, user.delete)

/* ------------------------------------------------------- */
module.exports = router