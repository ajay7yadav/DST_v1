const mongoose = require('mongoose');

const Notify = new mongoose.Schema({
    sender : {
        type : String
    },
    reciver : {
        type : String
    },
    subject : {
        type : String
    },
    body : {
        type : String
    },
    status : {
        type : Number,
        default : 0
    },
    created_at : {
        type : Date,
        default : () =>{
            return Date.now();
        },
        immutable : true
    },
    updated_at : {
        type : Date,
        default : () =>{
            return Date.now();
        }
    }
});

module.exports = mongoose.model('notify', Notify);