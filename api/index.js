const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const USER = require('./models/userModel')

const app = express()
const PORT = process.env.PORT || 4000
const MONGO_STRING = process.env.MONGO_STRING

app.listen(PORT, ()=>{
    console.log(`App Listening at PORT ${PORT}`)
})

mongoose.connect(MONGO_STRING)
    .then(()=>{
    console.log("Mongoose Connected")
    })
    .catch((err)=>{
        console.log("Mongoose couldn't connect, something went wrong. Please try creating your own DB cluster (won't take much time) and then just put in the connection URI string in the .env file.", err)
    })



app.get('/', (req,res)=>{
    res.send("testing")
})









