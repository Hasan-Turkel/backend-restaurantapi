"use strict"

// Middleware: permissions

module.exports = {

   

    isLogin: (req, res, next) => {

        return next()


        if (req.isLogin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },
    
    isOwner: (req, res, next) => {

        
        return next()
        
        if (req.isLogin && req.user.isOwner) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    }

}