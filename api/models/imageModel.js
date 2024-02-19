const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    title: {type: String},
    filename: {type: String},
    extension: {type: String},
    path: {type:String},
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'user'}
})


const IMAGE = new mongoose.model('image', imageSchema)

module.exports = {IMAGE}