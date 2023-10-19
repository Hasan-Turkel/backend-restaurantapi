"use strict"

const Reservation = require("../models/reservationModel")
const User = require("../models/userModel")

module.exports = {

    list: async(req, res)=>{

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

        const data = await res.getModelList(Reservation, {},  "branchId")
        res.status(200).send({
            error:false,
            details:await res.getModelListDetails(Reservation),
            data
        })
    },
    create: async(req, res)=>{

          
            // #swagger.tags = ["Reservations"]
            // #swagger.summary = "Create Reservations"
            // #swagger.parameters['body'] = {
            //     in: 'body',
            //     required: true,
            //     schema: {
            //         $ref: '#/definitions/Reservation'
            //     }
            // }
        

        const sendEmail = (require("../helpers/mailer"))
        const owner = await User.findOne({isOwner: true }, { _id: 0, email: 1, emailPassword:1 })
        const data = await Reservation.create(req.body)
        sendEmail(owner.email, "There is a new reservation")

        res.status(201).send({
            error:false,
            data
        })
    },
    read: async(req, res)=>{

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
    update: async(req, res)=>{

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

        const data = await Reservation.updateOne({_id:req.params.id}, req.body)
        const currentData = await Reservation.findOne({_id:req.params.id})
        const sendEmail = (require("../helpers/mailer"))
       

       if(req.body.accepted)  {
        sendEmail(currentData.guestEmail, "Your reservation has been confirmed")
       }
        else if (req.body.accepted==false) {
            sendEmail(currentData.guestEmail, "Your reservation has been rejected")
        }
       
        res.status(202).send({
            error:false,
            data,
            newData: await Reservation.findOne({_id:req.params.id})
        })

    },
    delete: async(req, res)=>{

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