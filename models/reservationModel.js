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
    date: {
        type: Date,
        required:true
    },
    hour:{
        type:String,
        required:true
    },

    situation:{
        type:String,
        default:"reserved"
    }
}, {collection:"reservations", timestamps:true})

module.exports = mongoose.model("Reservation", ReservationSchema)