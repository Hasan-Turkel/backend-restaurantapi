"use strict"

const Reservation = require("../models/reservationModel")
const User = require("../models/userModel")

module.exports = {

    list: async (req, res) => {
      /*
            #swagger.tags = ['Reservations']
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
            let filters = req.user.isOwner ? {} : { guestName: req.user.username };
            const data = await res.getModelList(Blog, filters, branchId)
            res.status(200).send({
                error:false,
                details:await res.getModelListDetails(Reservation),
                data
            })
    },

    create: async (req, res) => {
         // #swagger.tags = ["Reservations"]
            // #swagger.summary = "Create Reservations"
            // #swagger.parameters['body'] = {
            //     in: 'body',
            //     required: true,
            //     schema: {
            //         $ref: '#/definitions/Reservation'
            //     }
            // }

            req.body.guestName = req.user.username;
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
/*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single REservation"
        */

     
            const data = await Reservation.findOne({_id:req.params.id
            })
            res.status(200).send({
                error:false,
                data
            })

    },

    update: async (req, res) => {
         /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Reservation'
                }
            }
        */

            const filters = req.user?.isOwner
      ? { _id: req.params.id }
      : { _id: req.params.id, guestName: req.user.username };
      
    const data = await Blog.updateOne(filters, req.body, {
      runValidators: true,
    });

           
            res.status(202).send({
                error:false,
                data,
                newData: await Reservation.findOne({_id:req.params.id})
            })

    },

    delete: async (req, res) => {
     /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

            const data = await Reservation.deleteOne({_id:req.params.id})

            res.status(data.deletedCount ? 204 : 404).send({
                error: !data.deletedCount,
                data
            })

    },
}