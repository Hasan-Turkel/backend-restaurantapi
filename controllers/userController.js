"use strict"

const User = require("../models/userModel")
const Token = require("../models/tokenModel")
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

            // const filters = req.user?.isOwner ? {} : { _id: req.user?._id }
        
            const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            data
        })
    },

    create: async (req, res) => {
            /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.description = "Look to <b>'Models/Personnel'</b> for parameters."
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    $ref: '#/definitions/User'
                }
            }
        */

            req.body.isOwner = false

            const data = await User.create(req.body)
    
            // Create token for auto-login:
            const tokenData = await Token.create({
                user_id: data._id,
                token: passwordEncrypt(data._id + Date.now())
            })
    
            res.status(201).send({
                error: false,
                token: tokenData.token,
                data
            })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

            const filters = (req.user?.isOwner) ? { _id: req.params.id } : { _id: req.user._id }

            const data = await User.findOne(filters)

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
            /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.description = "Look to <b>'Models/Personnel'</b> for parameters."
            #swagger.parameters['body'] = {
                in: 'body',
                required: 'true',
                schema: {
                    $ref: '#/definitions/User'
                }
            }
        */

            const filters = (req.user?.isOwner) ? { _id: req.params.id } : { _id: req.user._id }
            req.body.isOwner = (req.user?.isOwner) ? req.body.isOwner : false
    
            const data = await User.updateOne(filters, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

            const filters = (req.user?.isOwner) ? { _id: req.params.id } : { _id: req.user._id }

            const data = await User.deleteOne(filters)

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}