"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require('../controllers/reservationController')
const permissions = require("../middlewares/permissions")

// URL: /reservations

router.route('/')
    .get(permissions.isLogin, reservation.list)
    .post(permissions.isLogin, reservation.create)

router.route('/:id')
    .get(permissions.isOwner, reservation.read)
    .put(permissions.isLogin,reservation.update)
    .patch(permissions.isLogin,reservation.update)
    .delete(permissions.isOwner, reservation.delete)

/* ------------------------------------------------------- */
module.exports = router