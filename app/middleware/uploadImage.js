const multer = require('multer');

uploadImage = function (req, res, next) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
      callback(null, 'temp');
    }
  });
  const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  upload = multer({ storage: storage, fileFilter: imageFilter }).single('image')

  const cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'learntocodeinfo',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log('file uploaded to server');

    res.locals.upload_file = req.file;
    res.locals.upload_body = req.body;

    // res.json({
    // 	path,
    // 	body
    // });

    next();

  });


};

module.exports = uploadImage;