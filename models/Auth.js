const mongoose = require("mongoose")

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name :{
        type : String
    },
    password: {
        type: String,
        required: true,
        select :false
    },
    isVerified :{
      type:Boolean,
      default : false
    },
    verificationCode : String,
    createdAt :{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',  user);