const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('pages/index', {
		title: 'btm admin'
	});
});

router.get('/login', function(req, res, next) {
	res.render('pages/login', {
		title: 'btm admin',
		layout: 'login'
	});
});

module.exports = router;
