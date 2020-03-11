const Work = require('../models/Work');
const Photo = require('../models/Photo');
const asyncHandler = require('../middleware/async');


exports.work_list = asyncHandler(async function (req, res, next) {
  let query = req.query.modality;
  let works = {};
  let count = {};

  if (query) {
    works = await Work.find({ modality: query }).sort('title');
    count = works.length
  } else {
    query = works.length;
    works = await Work.find().sort('title');
    count.all = works.length;
    count.sculpture = works.filter(work => work.modality === 'sculpture').length;
    count.painting = works.filter(work => work.modality === 'painting').length;
    count.drawing = works.filter(work => work.modality === 'drawing').length;
  }

  res.status(200).json({
    query,
    count,
    works
  });

});

exports.photo_list = asyncHandler(async function (req, res, next) {
  let query = req.query.modality;
  let photos = {};
  let count = {};

  if (query) {
    photos = await Photo.find({ modality: query }).sort('title');
    count = photos.length
  } else {
    query = photos.length;
    photos = await Photo.find().sort('title');
    count.all = photos.length;
    count.sculpture = photos.filter(photo => photo.modality === 'sculpture').length;
    count.painting = photos.filter(photo => photo.modality === 'painting').length;
    count.drawing = photos.filter(photo => photo.modality === 'drawing').length;
  }

  res.status(200).json({
    query,
    count,
    photos
  });

});

