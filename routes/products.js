var express = require('express');
const MongoClient = require('mongodb').MongoClient
var router = express.Router();
const {PASS} = require('../credentials');

const db_name = 'products';

//Set up default mongoose connection
const uri = `mongodb+srv://admin:${PASS}@shopdb.prb7q.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if(err) console.log(err);
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
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

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(productsTemp);
});

router.post('/', function (req, res, next) {

});

module.exports = router;
