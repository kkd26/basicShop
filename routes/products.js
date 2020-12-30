var express = require('express');
const mongo = require('mongodb');
var router = express.Router();
const { getCollectionByName } = require('./db');
//Set up default mongoose connection

// perform actions on the collection object
const products = getCollectionByName('products');

/* GET products listing. */
router.get('/', async function (req, res, next) {
  (await products).find({}).toArray(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
});

router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    (await products).findOne({ _id: new mongo.ObjectId(id) }).then(function (result) {
      res.json(result);
    })
  } catch (err) {
    res.status(404).json({ message: "incorrect id" });
  }
});

/* POST product */
router.post('/', async function (req, res, next) {
  const data = req.body;
  (await products).insertOne(data).then(result => {
    res.status(201).json({ "message": "Product was created" });
  }).catch(error => { res.json({ "message": "Failure to create a product" }); return console.error(error); })
});

router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    (await products).deleteOne({ _id: new mongo.ObjectId(id) }).then(function (result) {
      res.json({ message: "object deleted" });
    })
  } catch (err) {
    res.status(404).json({ message: "incorrect id" });
  }
});

module.exports = router;
