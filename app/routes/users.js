const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// GET request for creating user
// @desc display form: user_create
// @route GET /users/create
// @access private


// POST request for creating user
// @desc process form: user_create
// @route POST /users/register
// @access private


// GET request for login user
// @desc display form: user_login
// @route GET /users/login
// @access private
router.get('/login', user_controller.user_login_get);

// POST request for creating user
// @desc process form: user_login
// @route POST /user/login
// @access private


module.exports = router;
