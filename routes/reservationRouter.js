"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require('../controllers/reservationController')
const permissions = require("../middlewares/permissions")

// URL: /reservations

router.route('/')
    .get(permissions.isOwner, reservation.list)
    .post(reservation.create)

router.route('/:id')
    .get(reservation.read)
    .put(permissions.isOwner,reservation.update)
    .patch(permissions.isOwner,reservation.update)
    .delete(permissions.isOwner, reservation.delete)

/* ------------------------------------------------------- */
module.exports = router