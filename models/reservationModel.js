"use strict"


const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({

    guestName: {
        type: String,
        trim: true,
        required: true,
       
    },
    guestEmail: {
        type: String,
        trim: true,
        required: true,
        unique:true,
        validate: [
            (guestEmail) => guestEmail.includes('@') && guestEmail.includes('.'),
            'Email type is not correct.'
        ]
    },
    guestPhone: {
        type: Number,
        required: true,
        unique:true,
        },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true,
      
    },
    dayAndHour: {
        type: Date,
        required:true
    },
    note: {
        type: String,
        
    },

    accepted:{
        type:Boolean,
    }
}, {collection:"reservations", timestamps:true})

module.exports = mongoose.model("Reservation", ReservationSchema)