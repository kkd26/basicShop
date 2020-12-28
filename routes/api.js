var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var productsRouter = require('./products');

router.use('/', indexRouter);
router.use('/products', productsRouter);

module.exports = router;
