const Photo = require('../models/Photo');

// Display list of all photos.
exports.photo_list = function(req, res) {
	if (req.params.workID) {
		res.send('NOT IMPLEMENTED: photo list (specific work)');
	} else {
		res.send('NOT IMPLEMENTED: photo list');
	}
};

// Display detail page for a specific photo.
exports.photo_detail = function(req, res) {
	res.send('NOT IMPLEMENTED: photo detail: ' + req.params.photoID);
};

// Display photo create form on GET.
exports.photo_create_get = function(req, res) {
	res.send('NOT IMPLEMENTED: photo create GET');
};

// Handle photo create on POST.
exports.photo_create_post = function(req, res) {
	res.send('NOT IMPLEMENTED: photo create POST');
};

// Display photo delete form on GET.
exports.photo_delete_get = function(req, res) {
	res.send('NOT IMPLEMENTED: photo delete GET');
};

// Handle photo delete on POST.
exports.photo_delete_delete = function(req, res) {
	res.send('NOT IMPLEMENTED: photo delete POST');
};

// Display photo update form on GET.
exports.photo_update_get = function(req, res) {
	res.send('NOT IMPLEMENTED: photo update GET');
};

// Handle photo update on POST.
exports.photo_update_put = function(req, res) {
	res.send('NOT IMPLEMENTED: photo update POST');
};
