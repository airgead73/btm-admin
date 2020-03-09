const mongoose = require('mongoose');
const slugify = require('slugify');

const WorkSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Add name'],
		trim: true
	},
	desc: {
		type: String,
		trim: true,
	},
	slug: String,
	modality: {
		type: String,
		enum: ['sculpture', 'painting', 'drawing']
	},
	material: {
		type: String,
		enum: ['bronze', 'iron', 'marble', 'clay', 'alabaster', 'oil and canvas', 'pencil']
	},
	category: {
		type: String,
		enum: ['figure', 'portrait', 'landscape', 'still life', 'wildlife', 'abstract']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create work slug from name
WorkSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

module.exports = mongoose.model('Work', WorkSchema);
