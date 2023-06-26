const cron = require('node-cron');
const notification = require('../models/notification.js');
const { senderBody } = require('./mail_confi.js');
const nodeMailer = require('./mail_sender.js');

const email_notify = async()=>{

    cron.schedule("*/1 * * * *", async()=>{
        console.log("==========={<     NOTIFICATION SENT     >}===============");

        const pendingMails = await notification.find({status : 0}).limit(5);

        if(pendingMails.length > 0){
            const mails = await senderBody( pendingMails );

            mails.forEach(user =>{
                const mailBody = {
                    from : user.from,
                    to : user.to,
                    subject : user.subject,
                    html : user.body
                };
            
                nodeMailer.sendMail( mailBody, async(err, info)=>{
                    if(err) {
                        console.log("Error while sending mail ",err.message);
                    }
                    else{
                        console.log("== : Email Sent : ==");
                        await notification.updateOne({_id : user._id}, {$set : {status : 1}});
                    }
                });
            });
        }
    });
}


module.exports = email_notify;