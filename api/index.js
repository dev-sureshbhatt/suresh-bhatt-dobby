const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//models
const { USER } = require('./models/userModel.js')
const { IMAGE } = require('./models/imageModel.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//for parsing data
const cors = require('cors')
const cookieParser = require('cookie-parser') // to parse cookie send via useEffect hook mounted in header for user authentication 


//dotenv variables
const PORT = process.env.PORT || 4000
const MONGO_STRING = process.env.MONGO_STRING
const JWT_SECRET = process.env.JWT_SECRET

//for file upload
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


//server initialization
const app = express()




//middlewares

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())



///



app.listen(PORT, () => {
    console.log(`App Listening at PORT ${PORT}`)
})

mongoose.connect(MONGO_STRING)
    .then(() => {
        console.log("Mongoose Connected")
    })
    .catch((err) => {
        console.log("Mongoose couldn't connect, something went wrong. Please try creating your own DB cluster (won't take much time) and then just put in the connection URI string in the .env file.", err)
    })



app.get('/', (req, res) => {
    res.send("testing")
})



//User Register endpoint
app.post('/register', async (req, res) => {

    try {
        //hashing password without storing user password in the server
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        //storing this hashed password with email in db
        const userDoc = await USER.create({
            email: req.body.email,
            password: hashedPassword
        })

        res.status(200).json({ "msg": "User Created" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "something went wrong" })

    }

})



//User Login endpoint
app.post('/login', async (req, res) => {
    try {
        //fetching user
        const userDoc = await USER.findOne({ email: req.body.email })

        if (!userDoc) {
            res.status(400).cookie("token", "").json({ "msg": "no user exist" })
        }
        else if (userDoc) {
            //verifying hash
            const isValidUser = bcrypt.compareSync(req.body.password, userDoc.password)
            if (isValidUser) {
                //signing jwt & issuing token cookie
                const token = jwt.sign({ email: userDoc.email, id: userDoc._id }, JWT_SECRET, {})
                res.cookie("token", token).status(200).json({ "msg": "User valid and token issued" })


            }
            else res.cookie("token", "").status(400).json({ "msg": "invalid credentials" })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "something went wrong" })
    }

})


//Logout - invalidating cookies
app.get('/logout', (req, res) => {
    res.status(200).clearCookie("token").json({ "msg": "You've been logged out successfully" })
})


//endpoint for file uploads

app.post('/upload', upload.array('files'), async (req, res) => {


    try {

        //for authorizing the user who is sending POST request. If the cookies are valid (JWT verified), only then the user is authorized to post photos 
        const { token } = req.cookies
        jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
            if (err) res.status(403).json({ "msg": "You are not authorized to upload images, please register/login first" }) // when cookie are not valid
            //when cookies are valid
            if (info) {
                const files = req.files
                for (let i = 0; i < files.length; i++) {
                    await IMAGE.create({
                        path: req.files[i].path, 
                        title: req.files[i].originalname, 
                        owner: info.id // stores id (user db object id) fetched from JWT token data
                    })
                    res.status(200).json({"msg":"Image(s) uploaded successfully"})

                }

            }
        })








    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "something went wrong" })
    }


})


//endpoint for profile authentication .

app.get('/profile', (req, res) => {

    try {
        const { token } = req.cookies

        jwt.verify(token, JWT_SECRET, {}, (err, userInfo) => {
            if (err) throw new error
            res.json({ userInfo })
        })


    } catch (error) {
        res.json({ "msg": "invalid cookies" })
    }

})



///endpoint for fetching all images by a user

app.get('/images', (req,res)=>{
    //authenticating users to find their respective images from db
    const {token} = req.cookies
    if (!token) {
        res.json({"msg":"please register/login first"})
    } else
    {
        jwt.verify(token, JWT_SECRET, {}, (err, userInfo)=>{
            if (err) {
                res.json({"msg":"You are not authorized, please login again"})
            } else {
                console.log(userInfo.id)
                IMAGE.find({owner: userInfo.id}).then(data => res.send(data)).catch(err => console.log(err))
            }
            
        })
    }
})