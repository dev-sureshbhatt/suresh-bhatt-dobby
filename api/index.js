const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {USER} = require('./models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')


//dotenv variables
const PORT = process.env.PORT || 4000
const MONGO_STRING = process.env.MONGO_STRING
const JWT_SECRET = process.env.JWT_SECRET

//for file upload
const multer = require('multer') 
const upload = multer({dest: 'uploads/'})


//server initialization
const app = express()




//middlewares

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))



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



//User Register endpoint
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

    res.status(200).json({"msg":"User Created"})        
    } catch (error) {
        console.log(error)
        res.status(500).json({"msg":"something went wrong"})
        
    }

})



//User Login endpoint
app.post('/login', async (req,res)=>{
    try {
        //fetching user
        const userDoc = await USER.findOne({email:req.body.email})
        
        if (!userDoc){
            res.status(400).cookie("token", "").json({"msg":"no user exist"})
        }
        else if (userDoc){
            //verifying hash
        const isValidUser = bcrypt.compareSync(req.body.password, userDoc.password)
        if (isValidUser) {
            //signing jwt & issuing token cookie
            const token = jwt.sign({email:userDoc.email}, JWT_SECRET,{})
            res.status(200).cookie("token", token).json({"msg":"User valid and token issued"})
            

        }
        else res.cookie("token", "").status(400).json({"msg":"invalid credentials"})
        }       
        
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({"msg":"something went wrong"})
    }
    
})


//Logout - invalidating cookies
app.get('/logout', (req,res)=>{
    res.status(200).clearCookie("token").json({"msg":"You've been logged out successfully"})
}) 


//endpoint for file uploads

app.post('/upload', upload.array('files'), (req,res)=>{
    console.log(req.body, req.files, req.file)
})