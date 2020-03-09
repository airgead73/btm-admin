const mongoose = require('mongoose');
const slugify = require('slugify');

const PhotoSchema = new mongoose.Schema({
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
	},
	work: {
		type: mongoose.Schema.ObjectId,
		ref: 'Work',
		required: true
	},
	height: Number,
	width: Number,
	slug: String,
	orientation: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create photo slug from name
PhotoSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});



module.exports = mongoose.model('Photo', PhotoSchema);
