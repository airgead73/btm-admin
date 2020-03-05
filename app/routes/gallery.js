const express = require('express');
const router = express.Router();

const work_controller = require('../controllers/workController');
const photo_controller = require('../controllers/photoController');

/// GALLERY ROUTE ///

// GET request for gallery home page
// @desc display gallery home view
// @route GET gallery/
// @access private
router.get('/', work_controller.index);

/// WORK ROUTES ///

// GET request for creating work
// @desc display form: work_create
// @route GET gallery/work/create
// @access private
router.get('/work/create', work_controller.work_create_get);

// POST for creating work
// @desc process form: work_create
// @route POST gallery/work/create
// @access private
router.post('/work/create', work_controller.work_create_post);

// GET request for update book
// @desc display form: work_update | use method overide to process POST as PUT
// @route GET gallery/work/:id/update
// @access private
router.get('/work/:id/update', work_controller.work_update_get);

// GET request to delete book
// @desc display form: work_delete | use method override to process POST as DELETE
// @route GET gallery/work/:id/delete
// @access private
router.get('/work/:id/delete', work_controller.work_delete_get);

// PUT request for update book
// @desc process form: work_update | use method overide to process POST as PUT
// @route POST gallery/work/:id/update
// @access private
router.put('/work/:id/update', work_controller.work_update_put);

// DELETE request to delete delete book
// @desc process form: work_delete | use method override to process POST as DELETE
// @route GET gallery/work/:id/delete
// @access private
router.delete('/work/:id/delete', work_controller.work_delete_delete);

// GET request for one work
// @desc display one work
// @route GET gallery/work/:id
// @access private
router.get('/work/:id', work_controller.work_detail);

// GET request for all works
// @desc display one work
// @route GET gallery/work/:id
// @access private
router.get('/work', work_controller.work_list);

/// PHOTO ROUTES ///

// GET request for creating photo
// @desc display form: photo_create
// @route GET gallery/photo/create
// @access private
router.get('/photo/create', photo_controller.photo_create_get);

// POST for creating photo
// @desc process form: photo_create
// @route POST gallery/photo/create
// @access private
router.post('/photo/create', photo_controller.photo_create_post);

// GET request for update book
// @desc display form: photo_update | use method overide to process POST as PUT
// @route GET gallery/photo/:id/update
// @access private
router.get('/photo/:id/update', photo_controller.photo_update_get);

// GET request to delete book
// @desc display form: photo_delete | use method override to process POST as DELETE
// @route GET gallery/photo/:id/delete
// @access private
router.get('/photo/:id/delete', photo_controller.photo_delete_get);

// PUT request for update book
// @desc process form: photo_update | use method overide to process POST as PUT
// @route POST gallery/photo/:id/update
// @access private
router.put('/photo/:id/update', photo_controller.photo_update_put);

// DELETE request to delete delete book
// @desc process form: photo_delete | use method override to process POST as DELETE
// @route GET gallery/photo/:id/delete
// @access private
router.delete('/photo/:id/delete', photo_controller.photo_delete_delete);

// GET request for one photo
// @desc display one photo
// @route GET gallery/photo/:id
// @access private
router.get('/photo/:id', photo_controller.photo_detail);

// GET request for all photos
// @desc display one photo
// @route GET gallery/photo/:id
// @access private
router.get('/photo', photo_controller.photo_list);

module.exports = router;
