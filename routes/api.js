var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var productsRouter = require('./products');
var categoriesRouter = require('./categories');
var groupsRouter = require('./groups');

router.use('/', indexRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/groups', groupsRouter);

module.exports = router;
