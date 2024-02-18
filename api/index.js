const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {USER} = require('./models/userModel.js')
const bcrypt = require('bcryptjs')


const app = express()
const PORT = process.env.PORT || 4000
const MONGO_STRING = process.env.MONGO_STRING


//middlewares

app.use(express.json())



///



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


app.post('/register', async (req,res)=>{

    try {
    //hashing password without storing user password in the server
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    
    //storing this hashed password with email in db
    const userDoc = await USER.create({
        email:req.body.email,
        password: hashedPassword
    })

    res.status(200).json(userDoc)        
    } catch (error) {
        console.log(error)
        res.status(500).json({"msg":"something went wrong"})
        
    }

})


app.post('/login', async (req,res)=>{
    try {
        //fetching user
        const userDoc = await USER.findOne({email:req.body.email})
        console.log(userDoc)
        //verifying hash
        const isValidUser = bcrypt.compareSync(req.body.password, userDoc.password)
        console.log(isValidUser)
        
        res.send("hi")    
    } catch (error) {
        console.log(error)
        res.status(500).json({"msg":"something went wrong"})
    }
    
})
