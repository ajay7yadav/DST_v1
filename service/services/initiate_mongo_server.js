const mongodb = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async (async() =>{
    
    try {
        console.log('-------- Initiating MongoDB Memory Server -------');

        const mongod = await MongoMemoryServer.create();

        let URI = mongod.getUri();

        const client = new mongodb.MongoClient(URI);

        await client.connect();

        const dbName = client.db('memory');
        const memoryData = dbName.collection('datamemory');

        console.log('------- Returning MongoDB Memory Server -------');
    } catch (err) {
        console.log('memory DB issue ',err.message);
    }

})();