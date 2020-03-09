const Image = require('../models/Image');
const Work = require('../models/Work');
const asyncHandler = require('../middleware/async');




// Handle photo create on POST.
exports.image_create_post = asyncHandler(async function (req, res, next) {
  console.log("posting...");
  console.log(req.body);
  const { title, caption, url } = req.body;
  image = await Image.create({
    title: title,
    caption: caption,
    url: url
  });
  res.json(image)
});


