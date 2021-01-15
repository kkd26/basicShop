var express = require('express');
const mongo = require('mongodb');
var router = express.Router();
const { getCollectionByName } = require('../middleware/db');
//Set up default mongoose connection

// perform actions on the collection object
const categories = getCollectionByName('categories');

/* GET categories listing. */
router.get('/', async function (req, res, next) {
  (await categories).find({}).toArray(function (err, result) {
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
    (await categories).findOne({ _id: new mongo.ObjectId(id) }).then(function (result) {
      res.json(result);
    })
  } catch (err) {
    res.status(404).json({ message: "incorrect id" });
  }
});

/* POST category */
router.post('/', async function (req, res, next) {
  const data = req.body;
  (await categories).insertOne(data).then(result => {
    res.status(201).json({ "message": "category was created" });
  }).catch(error => { res.json({ "message": "Failure to create a category" }); return console.error(error); })
});

router.delete('/:id', async function (req, res, next) {
  const id = req.params.id;
  try {
    (await categories).deleteOne({ _id: new mongo.ObjectId(id) }).then(function (result) {
      res.json({ message: "object deleted" });
    })
  } catch (err) {
    res.status(404).json({ message: "incorrect id" });
  }
});

module.exports = router;
