const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function(req, file, cb) {
		console.log(file);
		cb(null, file.originalname);
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res, next) => {
	const upload = multer({ storage }).single('name-of-input-key');
	upload(req, res, function(err) {
		if (err) {
			return res.send(err);
		}
		console.log('file uploaded to server');
		console.log(req.file);

		// SEND FILE TO CLOUDINARY

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET
		});
		const path = req.file.path;
		const uniqueFilename = new Date().toISOString();

		cloudinary.uploader.upload(
			path,
			{ public_id: `htest/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
			function(err, image) {
				if (err) return res.send(err);
				console.log('file uploaded to Cloudinary');
				// remove file from server
				const fs = require('fs');
				fs.unlinkSync(path);
				// return image details
				res.json(image);
			}
		);
	});
});

module.exports = router;
