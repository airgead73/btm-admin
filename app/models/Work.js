const mongoose = require('mongoose');
const slugify = require('slugify');

const WorkSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Add name'],
		trim: true,
		lowercase: true
	},
	slug: String,
	modality: {
		type: String,
		enum: ['sculpture', 'painting', 'drawing']
	},
	medium: {
		type: String,
		enum: ['bronze', 'iron', 'clay', 'oil and canvas', 'pencil']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create work slug from name
WorkSchema.pre('save', function(next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

module.exports = mongoose.model('Work', WorkSchema);
