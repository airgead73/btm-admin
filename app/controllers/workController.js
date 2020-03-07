const Work = require('../models/Work');

// Display list of all works.
exports.work_list = async function (req, res, next) {
	try {
		res.render('pages/works/index', {
			title: 'works'
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
};

// Display detail page for a specific work.
exports.work_detail = function (req, res) {
	try {
		res.render('pages/works/index', {
			title: req.params.workID
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
};

// Display work create form on GET.
exports.work_create_get = function (req, res) {
	try {
		res.render('pages/works/add', {
			title: 'add work'
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
};

// Handle work create on POST.
exports.work_create_post = function (req, res) {
	res.send('NOT IMPLEMENTED: work create POST');
};

// Display work delete form on GET.
exports.work_delete_get = function (req, res) {
	res.send('NOT IMPLEMENTED: work delete GET');
};

// Handle work delete on DELETE.
exports.work_delete_delete = function (req, res) {
	res.send('NOT IMPLEMENTED: work delete DELETE');
};

// Display work update form on GET.
exports.work_update_get = function (req, res) {
	exports.work_detail = function (req, res) {
		try {
			res.render('pages/works/index', {
				title: `update ${req.params.workID}`
			});
		} catch (err) {
			res.render('pages/error', {
				error: err
			});
		}
	};
};

// Handle work update on PUT.
exports.work_update_put = function (req, res) {
	res.send('NOT IMPLEMENTED: work update PUT');
};
