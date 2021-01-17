const express = require('express');
const router = express.Router();

router.post('/', async function (req, res, next) {
  console.log(req.body);
});

module.exports = router;