const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/db.config.js');
const bodyParser = require('body-parser');
const  email_notify  = require('./notificationService/mail_timer.js')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect(`${config.DB_URL}/${config.DB_Name}`);

const DB = mongoose.connection;
DB.on('error', () => {
  console.log('========= Error while connecting to MongoDB =======');
});
DB.once('open', () => {
  console.log('\======= Connected To MongoDB ========/');
});


require('./routes/user.routes.js')(app);
require('./routes/todo.routes.js')(app);
email_notify();

app.listen(5000, ()=>{
    console.log("Server running");
});