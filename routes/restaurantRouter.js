"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/restaurant:

const restaurant = require('../controllers/restaurantController')

// URL: /restaurants

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