"use strict"


const mongoose = require("mongoose")


const RestaurantSchema = new mongoose.Schema({

    restaurantName: {
        type: String,
        required: true,
    },
    branchName: {
        type: String,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    days:{
        type:String,
        required:true,
    },
    hours:{
        type:String,
        required:true,
    }
   
}, {collection:"restaurants", timestamps:true})

module.exports = mongoose.model("Restaurant", RestaurantSchema)