const express = require('express');
const router = express.Router();

const work_controller = require('../controllers/workController');
const photo_controller = require('../controllers/photoController');

/// GALLERY ROUTES ///

// GET request for gallery home page
// @desc display gallery home view
// @route GET gallery/
// @access private
router.get('/', work_controller.index);

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

module.exports = router;
