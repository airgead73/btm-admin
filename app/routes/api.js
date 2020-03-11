const express = require('express');
const api_controller = require('../controllers/apiController');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', api_controller.work_list);
router.get('/photos', api_controller.photo_list);

module.exports = router;