"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/reservation:

const permissions = require("../middlewares/permissions")
const reservation = require('../controllers/reservationController')

// URL: /reservations

router.route('/')
    .get(permissions.isOwner, reservation.list)
    .post(reservation.create)

router.route('/:id')
    .get(reservation.read)
    .put(permissions.isOwner,reservation.update)
    .patch(permissions.isOwner, reservation.update)
    .delete(permissions.isOwner, reservation.delete)

/* ------------------------------------------------------- */
module.exports = router