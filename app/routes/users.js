const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// GET request for creating user
// @desc display form: user_create
// @route GET /users/create
// @access private
router.get('/register', user_controller.user_create_get);

// POST request for creating user
// @desc process form: user_create
// @route POST /users/register
// @access private
router.post('/register', user_controller.user_create_post);

// GET request for login user
// @desc display form: user_login
// @route GET /users/login
// @access private
router.get('/login', user_controller.user_login_get);

// POST request for logging in user
// @desc process form: user_login
// @route POST /user/login
// @access private
router.post('/login', user_controller.user_login_post);

// GET request for logging out user
// @desc process logout redirect to login
// @route GET /user/logout
// @access private
router.get('/logout', user_controller.user_logout_get);

module.exports = router;
