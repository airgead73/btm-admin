const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add title'],
    trim: true
  },
  caption: {
    type: String,
    required: [true, 'Add caption'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Add url'],
    trim: true
  }

});



module.exports = mongoose.model('Image', ImageSchema);
