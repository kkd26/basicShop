var express = require('express');
var router = express.Router();

const newRouter = require('./newRouter');

const indexRouter = require('./index');
const productsRouter = newRouter('Product');
const categoriesRouter = newRouter('Category');
const groupsRouter = newRouter('Group');
const signUpRouter = require('../middleware/signup');

router.use('/', indexRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/groups', groupsRouter);
router.use('/user', signUpRouter);

module.exports = router;
