const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    title: {type: String},
    path: {type:String},
})


const IMAGE = new mongoose.model('image', imageSchema)

module.exports = {IMAGE}