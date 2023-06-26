const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    id : {
        type : Number
    },
    title : {
        type : String
    },
    dst_id : {
        type : String
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

module.exports = mongoose.model('todos', Todo)