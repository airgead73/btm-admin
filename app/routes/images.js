const express = require('express');
const router = express.Router();
const image_controller = require('../controllers/imageController');
const { ensureAuthenticated } = require('../middleware/auth');

//router.use(ensureAuthenticated);

// POST for creating photo
// @desc process form: photo_create
// @route POST gallery/photo/create
// @access private
router.post('/create', image_controller.image_create_post);



module.exports = router;
