"use strict"


const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({

    guestName: {
        type: String,
        trim: true,
        required: true,
       
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      
    },
    dayAndHour: {
        type: Date,
        required:true
    },

    situation:{
        type:String,
        default:"active"
    }
}, {collection:"reservations", timestamps:true})

module.exports = mongoose.model("Reservation", ReservationSchema)