const Photo = require('../models/Photo');
const Work = require('../models/Work');
const asyncHandler = require('../middleware/async');


// Display list of all photos.
exports.photo_list = asyncHandler(async function (req, res, next) {
	if (req.params.workID) {
		const photos = await Photo.find({ work: `${req.params.workID}` });
		res.status(200).render('pages/works/', {
			success: true,
			photos: photos
		})
	} else {
		const photos = await Photo.find();
		res.status(200).render('pages/photos/index', {
			success: true,
			count: photos.length,
			photos
		})
	}


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

// Display photo delete form on GET.
exports.photo_delete_get = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo delete GET');
});

// Handle photo delete on POST.
exports.photo_delete_delete = asyncHandler(async function (req, res, next) {
	const photo = await Photo.findByIdAndDelete(req.params.photoID);
	console.log("photo deleted: ", photo);
	res.redirect('/works');
});

// Display photo update form on GET.
exports.photo_update_get = asyncHandler(function (req, res, next) {

});

// Handle photo update on POST.
exports.photo_update_put = asyncHandler(function (req, res, next) {
	res.send('NOT IMPLEMENTED: photo update POST');
});

// GET upload form
exports.photo_create_get = asyncHandler(async function (req, res, next) {
	const work = await Work.findById(req.params.workID);
	res.render('pages/photos/upload', {
		work_id: work._id,
		work_title: work.slug
	});

});

// GET upload form
exports.photo_create_post = asyncHandler(async function (req, res, next) {
	// file and body transferred from uploadImage middleware
	const file = res.locals.upload_file;
	const body = res.locals.upload_body;


	const cloudinary = require('cloudinary').v2;
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	})

	const cloud_name = Date.now()

	const image = await cloudinary.uploader.upload(
		file.path,
		{ public_id: `btm/${body.work_title}/${body.work_title}-${cloud_name}`, tags: `art` }, // directory and tags are optional
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

	const getOrientation = function (h, w) {
		let height = parseInt(h);
		let width = parseInt(w);
		if (height === width) {
			return "square"
		} else if (height > width) {
			return "portrait"
		} else {
			return "landscape"
		}

	}

	const photoObj = {
		title: req.body.title,
		caption: req.body.caption,
		url: image.secure_url,
		work: body.work_id,
		width: image.width,
		height: image.height,
		orientation: getOrientation(image.height, image.width)
	};

	console.log(photoObj);

	photo = await Photo.create(photoObj);

	res.status(200).redirect(`/works/${photoObj.work}/detail`)

});
