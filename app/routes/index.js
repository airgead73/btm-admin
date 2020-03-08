const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async');
const { ensureAuthenticated } = require('../middleware/auth');

const indexController = asyncHandler(async function (req, res, next) {
	res.redirect('/works')
});

// GET request for home page
// @desc redirect to works if authenticated
// @route GET /
// @access private
router.get('/', ensureAuthenticated, indexController);

module.exports = router;
