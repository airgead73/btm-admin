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
		enum: ['bronze', 'iron', 'marble', 'clay', 'alabaster', 'oil & canvas', 'pencil']
	},
	category: {
		type: String,
		enum: ['figure', 'portrait', 'landscape', 'still life', 'wildlife', 'abstract']
	},
	thumbnail: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

// Create work slug from name
WorkSchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

WorkSchema.pre('remove', async function (next) {
	await this.model('Photo').deleteMany({ work: this._id })
})

// Reverse populate with virtuals
WorkSchema.virtual('photos', {
	ref: 'Photo',
	localField: '_id',
	foreignField: 'work',
	justOne: false
})

module.exports = mongoose.model('Work', WorkSchema);
