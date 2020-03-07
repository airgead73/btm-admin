const express = require('express');
const work_controller = require('../controllers/workController');

// Include other resource routers
const photos = require('./photos');

const router = express.Router();

// Reroute into other resource routers
router.use('/:workID/photos', photos);

/// WORK ROUTES ///

// GET request for creating work
// @desc display form: work_create
// @route GET /work/create
// @access private
router.get('/create', work_controller.work_create_get);

// POST for creating work
// @desc process form: work_create
// @route POST /work/create
// @access private
router.post('/create', work_controller.work_create_post);

// GET request for update book
// @desc display form: work_update | use method overide to process POST as PUT
// @route GET /work/:workID/update
// @access private
router.get('/:workID/update', work_controller.work_update_get);

// GET request to delete book
// @desc display form: work_delete | use method override to process POST as DELETE
// @route GET gallery/work/:workID/delete
// @access private
router.get('/:workID/delete', work_controller.work_delete_get);

// PUT request for update book
// @desc process form: work_update | use method overide to process POST as PUT
// @route POST gallery/work/:workID/update
// @access private
router.put('/:workID/update', work_controller.work_update_put);

// DELETE request to delete delete book
// @desc process form: work_delete | use method override to process POST as DELETE
// @route GET gallery/work/:workID/delete
// @access private
router.delete('/:workID/delete', work_controller.work_delete_delete);

// GET request for one work
// @desc display one work
// @route GET gallery/work/:workID
// @access private
router.get('/:workID/detail', work_controller.work_detail);

// GET request for all works
// @desc display one work
// @route GET gallery/work/:workID
// @access private
router.get('/', work_controller.work_list);

module.exports = router;
