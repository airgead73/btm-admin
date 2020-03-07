const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// GET request for creating user
// @desc display form: user_create
// @route GET /user/create
// @access private
router.get('/register', function (req, res, next) {
  res.send('GET user register form');
});

// POST request for creating user
// @desc process form: user_create
// @route POST /user/register
// @access private
router.post('/register', function (req, res, next) {
  res.send('POST user register form');
});

// GET request for login user
// @desc display form: user_login
// @route GET /user/login
// @access private
router.get('/login', function (req, res, next) {
  res.send('GET display user form');
});

// POST request for creating user
// @desc process form: user_login
// @route POST /user/login
// @access private
router.post('/login', function (req, res, next) {
  res.send('POST user login form');
});

module.exports = router;
