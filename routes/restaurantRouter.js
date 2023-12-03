"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/restaurant:
const permissions = require("../middlewares/permissions")
const restaurant = require('../controllers/restaurantController')

// URL: /restaurants



router.route('/')
    .get(restaurant.list)
    .post(permissions.isOwner, restaurant.create)

router.route('/:id')
    .get(permissions.isOwner, restaurant.read)
    .put(permissions.isOwner, restaurant.update)
    .patch(permissions.isOwner, restaurant.update)
    .delete(permissions.isOwner, restaurant.delete)

/* ------------------------------------------------------- */
module.exports = router