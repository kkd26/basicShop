var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var productsRouter = require('./products');
var categoriesRouter = require('./categories');

router.use('/', indexRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
