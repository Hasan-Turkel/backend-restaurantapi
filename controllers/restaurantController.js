"use strict"

const Restaurant = require("../models/restaurantModel")

module.exports = {

    list: async(req, res)=>{

        const data = await res.getModelList(Restaurant)
        res.status(200).send({
            error:false,
            details:await res.getModelListDetails(Restaurant),
            data
        })
    },
    create: async(req, res)=>{

        const data = await Restaurant.create(req.body)
        res.status(201).send({
            error:false,
            data
        })
    },
    read: async(req, res)=>{

        const data = await Restaurant.findOne({_id:req.params.id
        })
        res.status(200).send({
            error:false,
            data
        })

    },
    update: async(req, res)=>{

        const data = await Restaurant.updateOne({_id:req.params.id})
        res.status(202).send({
            error:false,
            data,
            newData: await Restaurant.findOne({_id:req.params.id}, req.body)
        })

    },
    delete: async(req, res)=>{

        const data = await Restaurant.deleteOne({_id:req.params.id})

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })


    },

}