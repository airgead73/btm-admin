const Photo = require('../models/Photo');
const asyncHandler = require('../middleware/async');


// Display list of all photos.
exports.photo_list = asyncHandler(function (req, res, next) {
	try {
		res.render('pages/photos/index', {
			title: 'photos'
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
	// if (req.params.workID) {
	// 	res.send('NOT IMPLEMENTED: photo list (specific work)');
	// } else {
	// 	res.send('NOT IMPLEMENTED: photo list');
	// }
});

// Display detail page for a specific photo.
exports.photo_detail = asyncHandler(function (req, res, next) {
	try {
		res.render('pages/photos/detail', {
			title: req.params.photoID
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
});

// Display photo create form on GET.
exports.photo_create_get = asyncHandler(function (req, res, next) {
	try {
		res.render('pages/photos/add', {
			title: 'add photo'
		});
	} catch (err) {
		res.render('pages/error', {
			error: err
		});
	}
});

// Handle photo create on POST.
exports.photo_create_post = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo create POST');
});

// Display photo delete form on GET.
exports.photo_delete_get = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo delete GET');
});

// Handle photo delete on POST.
exports.photo_delete_delete = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo delete POST');
});

// Display photo update form on GET.
exports.photo_update_get = asyncHandler(function (req, res, next) {

});

// Handle photo update on POST.
exports.photo_update_put = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo update POST');
});

// GET upload form
exports.photo_upload_get = asyncHandler(function (req, res, next) {
	const work = req.params.workID;
	res.render('pages/photos/upload', {
		work: work
	});

});

// GET upload form
exports.photo_upload_post = asyncHandler(function (req, res, next) {
	const file = res.locals.upload_file;
	const body = res.locals.upload_body;
	let newResult = {};
	console.log("file: ", file);
	console.log("body", body);

	const cloudinary = require('cloudinary');

	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	});



	cloudinary.uploader.upload(
		file.path,
		{ public_id: `blog/img-${body.work}`, tags: `blog` }, // directory and tags are optional
		function (err, image) {
			console.log("cloudinary working")
			if (err) return res.send(err);
			console.log('file uploaded to Cloudinary');
			// remove file from server
			const fs = require('fs');
			fs.unlinkSync(path);
			// return image details
			newResult = image;
			console.log(image)

		}
	);

	res.json(newResult)





});
