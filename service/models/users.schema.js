const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    sex : {
        type : String
    },
    dst_id : {
        type : String
    },
    otp : {
        type : String
    },
    otpTime : {
        type : Date
    },
    created_at : {
        type : Date,
        default : ()=>{
            return Date.now();
        },
        immutable : true
    },
    updated_at : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model('user', User);