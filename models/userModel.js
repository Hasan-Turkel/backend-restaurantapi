"use strict"


const mongoose = require("mongoose")
const passwordEncrypt = require("../helpers/passwordEncrypt")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },
    is_active:{
        type:Boolean,
        default:true
    },

    isOwner: {
        type: Boolean,
        default: false,
    },
}, {collection:"users", timestamps:true})

module.exports = mongoose.model("User", UserSchema)