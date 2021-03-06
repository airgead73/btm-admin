const Work = require('../models/Work');
const Photo = require('../models/Photo');
const asyncHandler = require('../middleware/async');


exports.work_list = asyncHandler(async function (req, res, next) {
  let query = req.query;
  let works = {};
  let count = {};

  if (query) {
    works = await Work.find(req.query).populate('photos').sort('title');
    count = works.length
  } else {
    query = works.length;
    works = await Work.find().populate('photos').sort('title');
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
  const query = req.query.modality;
  const photos = await Photo.find().populate({
    path: 'work',
    match: {
      modality: query
    }
  });

  filteredResults = photos.filter(photo => {
    return photo.work;
  });

  filteredResults.forEach(photo => {
    console.log(photo.work.modality);
  })

  const photoCount = photos.length;
  const filterCount = filteredResults.length;



  res.status(200).json({
    query,
    photoCount,
    filterCount,
    photos,
    filteredResults
  });

});

