const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    port : 465,
    service : "gmail",
    auth : {
        user : 'ajay7yadav95@gmail.com',
        pass : 'akbvweqfericltsa'
    },
    secure : true
});