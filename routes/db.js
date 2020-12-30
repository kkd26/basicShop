const MongoClient = require('mongodb').MongoClient

const { PASS } = require('../credentials');

const db_name = 'products';
const uri = `mongodb+srv://admin:${PASS}@shopdb.prb7q.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = client.connect().then(suc => client.db(db_name));

const getCollectionByName = async name => {
    return (await db).collection(name);
}

module.exports.getCollectionByName = getCollectionByName;
