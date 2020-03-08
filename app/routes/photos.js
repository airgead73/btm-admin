const express = require('express');
const router = express.Router({ mergeParams: true });
const { ensureAuthenticated } = require('../middleware/auth');

const photo_controller = require('../controllers/photoController');

router.use(ensureAuthenticated);

/// PHOTO ROUTES ///

// GET request for creating photo
// @desc display form: photo_create
// @route GET gallery/photo/create
// @access private
router.get('/create', photo_controller.photo_create_get);

// POST for creating photo
// @desc process form: photo_create
// @route POST gallery/photo/create
// @access private
router.post('/create', photo_controller.photo_create_post);

// GET request for update book
// @desc display form: photo_update | use method overide to process POST as PUT
// @route GET gallery/photo/:photoID/update
// @access private
router.get('/:photoID/update', photo_controller.photo_update_get);

// GET request to delete book
// @desc display form: photo_delete | use method override to process POST as DELETE
// @route GET gallery/photo/:photoID/delete
// @access private
router.get('/:photoID/delete', photo_controller.photo_delete_get);

// PUT request for update book
// @desc process form: photo_update | use method overide to process POST as PUT
// @route POST gallery/photo/:photoID/update
// @access private
router.put('/:photoID/update', photo_controller.photo_update_put);

// DELETE request to delete delete book
// @desc process form: photo_delete | use method override to process POST as DELETE
// @route GET gallery/photo/:photoID/delete
// @access private
router.delete('/:photoID/delete', photo_controller.photo_delete_delete);

// GET request for one photo
// @desc display one photo
// @route GET gallery/photo/:photoID
// @access private
router.get('/:photoID/detail', photo_controller.photo_detail);

// GET request for all photos
// @desc display one photo
// @route GET gallery/photo/:photoID
// @access private
router.get('/', photo_controller.photo_list);

module.exports = router;
