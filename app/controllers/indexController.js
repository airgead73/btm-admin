// Display home page.
const asyncHandler = require('../middleware/async');
exports.home_get = asyncHandler(async function (req, res) {
  res.render('pages/index', {
    title: 'btm admin'
  });
});