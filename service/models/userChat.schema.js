const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
    text : {
        type : String
    },
    dst_id : {
        type : String
    },
    reciver_id : {
        String
    }
});

module.exports = mongoose.model('chat',Chat);