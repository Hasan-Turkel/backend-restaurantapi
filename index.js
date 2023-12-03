"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT 

require("express-async-errors")

const dbConnection = require("./configs/dbConnection")
dbConnection()


app.use(express.json())

app.use(require("./middlewares/authentication"))

app.use(require("./middlewares/findSearchSortPage"))

// app.use(require('./middlewares/logger'))


const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
// Parse/Run swagger.json and publish on any URL:
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
// Redoc:
// npm i redoc-express
const redoc = require('redoc-express')
app.use('/docs/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})
app.use('/docs/redoc', redoc({
    specUrl: '/docs/json',
    title: 'API Docs',
   
}))

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to RestaurantApi',
        api: {
            documents: {
                swagger: 'http://127.0.0.1:8000/docs/swagger',
                redoc: 'http://127.0.0.1:8000/docs/redoc',
                json: 'http://127.0.0.1:8000/docs/json',
            },
            contact: 'mhturkel@gmail.com'
        },
        
    })
})

app.use('/users', require('./routes/userRouter'))
app.use('/restaurants', require('./routes/restaurantRouter'))
app.use('/reservations', require('./routes/reservationRouter'))
app.use('/tokens', require('./routes/tokenRouter'))
app.use('/auth', require('./routes/authRouter'))

app.use(require("./middlewares/errorHandler"))

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))