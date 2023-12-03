"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const permissions = require("../middlewares/permissions")
const token = require('../controllers/tokenController')

// URL: /tokens

router.use(permissions.isOwner)

router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)

/* ------------------------------------------------------- */
module.exports = router