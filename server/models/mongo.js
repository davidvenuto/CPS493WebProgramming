const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;

async function connect() {
    const client = new MongoClient(url, {
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();
    const db = client.db(dbName);
    return db;
}

module.exports = { connect, ObjectId };