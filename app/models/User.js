const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	last_name: {
		type: String,
		required: [true, 'Add last name'],
		trim: true,
		lowercase: true
	},
	first_name: {
		type: String,
		required: [true, 'Add last name'],
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		required: [true, 'Provide an email'],
		unique: true,
		trim: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Provide a valid email'
		]
	},
	password: {
		type: String,
		required: [true, 'Provide a password'],
		trim: true
	},
	slug: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create user slug from last name and first name
UserSchema.pre('save', function(next) {
	let newSlug = `${this.last_name}-${this.first_name}`;
	newSlug = newSlug.toLocaleLowerCase();
	this.slug = newSlug;
	next();
});

// Middleware: Encrypt pwd using bcrypt
UserSchema.pre('save', async function(next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
