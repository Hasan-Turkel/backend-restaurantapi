"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/restaurant:
const permissions = require("../middlewares/permissions")
const restaurant = require('../controllers/restaurantController')

// URL: /restaurants

router.use(permissions.isOwner)

router.route('/')
    .get(restaurant.list)
    .post(restaurant.create)

router.route('/:id')
    .get(restaurant.read)
    .put(restaurant.update)
    .patch(restaurant.update)
    .delete(restaurant.delete)

/* ------------------------------------------------------- */
module.exports = router