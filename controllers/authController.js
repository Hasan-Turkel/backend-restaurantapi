"use strict"

// Auth Controller:


const setToken = require('../helpers/setToken')

const User = require('../models/userModel')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

        const { username, password } = req.body

        if (username && password) {

            const user = await User.findOne({ username, password })

            if (user) {

               
                    res.send({
                        error: false,
                        token: setToken(user)
                    })

               
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
    },

    

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })

    },
}
