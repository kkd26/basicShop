const { getModelByName } = require('../middleware/db');

const getRouter = (name) => {
  var router = require('express').Router();
  const objectModel = getModelByName(name);

  /* GET all objects */
  router.get('/', async function (req, res, next) {
    objectModel.find({}, function (err, docs) {
      if (err) {
        res.status(500).send();
      } else {
        res.json(docs);
      }
    });
  });

  router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    objectModel.findOne({ _id: id }, function (err, docs) {
      if (err) {
        res.status(404).send({ message: "incorrect id" });
      } else {
        res.json(docs);
      }
    })
  });

  /* POST product */
  router.post('/', async function (req, res, next) {
    const data = req.body;
    const object = new objectModel(data);
    object.save(function (err) {
      if (err) {
        console.error(err);
        res.status(400).json({ "message": "Failure to create an object" });
      } else {
        res.status(201).json({ "message": "Object was created" });
      }
    });
  });

  router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;
    objectModel.deleteOne({ _id: id }, function (err) {
      if (err) {
        res.status(404).json({ message: "incorrect id" });
      } else {
        res.json({ message: "Object was deleted" });
      }
    })

  });

  return router;
}

module.exports = getRouter;
