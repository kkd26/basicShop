var express = require('express');
var router = express.Router();

/* GET REST API Documentation*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'REST API Documentation' });
});

module.exports = router;
