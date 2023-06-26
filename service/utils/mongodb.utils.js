// const mongo = require('mongodb');
// const { MongoClient } = mongo;
// const dbCofig = require('../config/db.config.js');

// const client = new MongoClient(dbCofig.DB_URL)
// let Users;
// let Todos;
// client.connect().then(()=>{
//     const db = client.db(dbCofig.DB_Name);
    
//     Users = db.collection('user');
//     Todos = db.collection('todos');

// }).catch(err =>{
//     console.log("Error ",err);
// })

// module.exports = { Users, Todos }
