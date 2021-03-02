const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const userModel = require('../models/User');

/**
 * Sign up an user. Save user info with hashed password in MongoDB.
 */
router.post('/', async function (req, res, next) {
  const userData = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
  };
  const user = new userModel(userData);
  user.save(function (err) {
    if (err) {
      res.status(500).json({ message: 'Failure to create an user' });
    } else {
      res.status(201).json({ message: 'User was created' });
    }
  });
});

/**
 * Login request from an user. Response with JWT.
 */
router.post('/login', async function (req, res, next) {
  const username = req.body.username;
  const user = { username: username };
  userModel.findOne(user, async function (err, docs) {
    if (err) {
      res.sendStatus(500);
    } else if (docs) {
      if (docs.role) user.role = docs.role;
      if (
        req.body.password &&
        (await bcrypt.compare(req.body.password, docs.password))
      ) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.status(202).json({ accessToken: accessToken });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  });
});

/**
 * Authenticates user from a cookie 'jwt' //TODO: auth by Bearer header
 */
function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies && req.cookies.jwt;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user);
    next();
  });
}

function adminAccessOnly(req, res, next) {
  var isAdmin = false;
  authenticateToken(req, res, () => {
    if (req.user.role === 'admin') {
      isAdmin = true;
    }
  });
  if (!isAdmin) return res.sendStatus(403);
  next();
}

/**
 * Get all users. Only for admins
 */
router.get('/', adminAccessOnly, async function (req, res, next) {
  userModel.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(`<pre>${docs}</pre>`);
    }
  });
});

/**
 * Check username of currently logged user.
 */
router.get('/whoami', authenticateToken, async function (req, res, next) {
  userModel.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(`<pre>${JSON.stringify(req.user)}</pre>`);
    }
  });
});

module.exports = router;
module.exports.adminAccessOnly = adminAccessOnly;
