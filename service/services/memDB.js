const env = require('../config/config.js');
const User = require('../models/users.schema.js');
const { decryptData, encryptData } = require('../services/crypto.js');
const MongoMemoryInstance = require('./initiate_mongo_server.js');

const populateMongoMemoryInstance = async () => {
    try {
        console.log(
            "------------Populating MongoDB Memory Instance------------------"
        );

        let UsersCollectionData = await User.find();

        let { result: decryptedUserCollectionData, malformed } =
            await decryptData(UsersCollectionData, env.key);

        await MongoMemoryInstance.deleteMany({});

        let data = await MongoMemoryInstance.insertMany(decryptedUserCollectionData);
        
        let numOfDocuments = await MongoMemoryInstance.countDocuments();

        console.log(
            "Total document populated in MongoMemoryInstance: ",
            numOfDocuments
        );
        console.log("Total malformed data present: ", malformed.length);
        console.log("malformed", malformed);
    } catch (err) {
        console.log("Error in populating MemDB: ", err.message);
    }
};

module.exports = { MongoMemoryInstance, populateMongoMemoryInstance }