const express = require('express');
const router = express.Router();

const { checkInitial } = require('../middleware/auth');

const indexController = require('../controllers/indexController');


// GET request for home page
// @desc redirect to works if authenticated
// @route GET /
// @access private
router.get('/', checkInitial, indexController.home_get);


module.exports = router;
