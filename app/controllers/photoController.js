const Photo = require('../models/Photo');
const Work = require('../models/Work');
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
exports.photo_upload_get = asyncHandler(async function (req, res, next) {
	const work = await Work.findById(req.params.workID);
	res.render('pages/photos/upload', {
		work_id: work._id,
		work_title: work.slug
	});

});

// GET upload form
exports.photo_upload_post = asyncHandler(async function (req, res, next) {
	const file = res.locals.upload_file;
	const body = res.locals.upload_body;
	let newResult = {};
	console.log("file: ", file);
	console.log("body", body);

	const cloudinary = require('cloudinary').v2;

	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	})

	const cloud_name = Date.now()

	const image = await cloudinary.uploader.upload(
		file.path,
		{ public_id: `btm/${body.work_title}/img-${cloud_name}`, tags: `blog` }, // directory and tags are optional
		function (err, image) {
			if (err) return res.send(err);
			console.log('file uploaded to Cloudinary');
			// remove file from server
			const fs = require('fs');
			fs.unlinkSync(file.path);
			// return image details
			return image;
		}
	);

	const photoObj = {
		title: req.body.title,
		caption: req.body.caption,
		url: image.secure_url,
		work: body.work_id,
		width: image.width,
		height: image.height
	};

	console.log(photoObj);

	photo = await Photo.create(photoObj);

	res.status(200).json({
		success: true,
		data: photo
	});

	// res.json({
	// 	title: req.body.title,
	// 	caption: req.body.caption,
	// 	public: image.public_id,
	// 	width: image.width,
	// 	height: image.height,
	// 	url: image.secure_url,
	// 	work: body.work_id,
	// 	work_title: body.work_title
	// });

});
