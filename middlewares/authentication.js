"use strict"

// app.use(authentication):

const Token = require('../models/token')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

   
        if (tokenKey && tokenKey[0] == 'Token') { // SimpleToken

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('user_id')
            req.user = tokenData ? tokenData.user_id : undefined

        } 
    

    next()
}