var express = require('express');
const MongoClient = require('mongodb').MongoClient
var router = express.Router();
const { PASS } = require('../credentials');

const db_name = 'products';

//Set up default mongoose connection
const uri = `mongodb+srv://admin:${PASS}@shopdb.prb7q.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) console.log(err);
  const collection = client.db(db_name).collection(db_name);
  // perform actions on the collection object


  /* GET products listing. */
  router.get('/', function (req, res, next) {
    console.log(collection);
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  });

  /* POST product */
  router.post('/', async function (req, res, next) {
    const data = req.body;
    collection.insertOne(data).then(result => {
      console.log(result)
      res.json({ "status": "success" });
    }).catch(error => { res.json({ "status": "success" }); return console.error(error); })
  });
});


const productsTemp = [
  {
    id: 1,
    name: "product1",
    price: 13.2
  },
  {
    id: 2,
    name: "product2",
    price: 23.2
  },
  {
    id: 3,
    name: "product3",
    price: 33.2
  },
  {
    id: 4,
    name: "product4",
    price: 43.2
  },
];

module.exports = router;
