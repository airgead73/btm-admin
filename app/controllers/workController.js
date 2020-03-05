const Work = require('../models/Work');

exports.index = function(req, res) {
	res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all works.
exports.work_list = function(req, res) {
	res.send('NOT IMPLEMENTED: work list');
};

// Display detail page for a specific work.
exports.work_detail = function(req, res) {
	console.log(req.params);
	res.send('NOT IMPLEMENTED: work detail: ' + req.params.workID);
};

// Display work create form on GET.
exports.work_create_get = function(req, res) {
	res.send('NOT IMPLEMENTED: work create GET');
};

// Handle work create on POST.
exports.work_create_post = function(req, res) {
	res.send('NOT IMPLEMENTED: work create POST');
};

// Display work delete form on GET.
exports.work_delete_get = function(req, res) {
	res.send('NOT IMPLEMENTED: work delete GET');
};

// Handle work delete on DELETE.
exports.work_delete_delete = function(req, res) {
	res.send('NOT IMPLEMENTED: work delete DELETE');
};

// Display work update form on GET.
exports.work_update_get = function(req, res) {
	res.send('NOT IMPLEMENTED: work update GET');
};

// Handle work update on PUT.
exports.work_update_put = function(req, res) {
	res.send('NOT IMPLEMENTED: work update PUT');
};
