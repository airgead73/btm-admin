const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	lname: {
		type: String,
		required: [true, 'Add first name.'],
		trim: true,
		lowercase: true
	},
	fname: {
		type: String,
		required: [true, 'Add last name.'],
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		required: [true, 'Provide an email.'],
		unique: true,
		trim: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Provide a valid email'
		]
	},
	password: {
		type: String,
		required: [true, 'Provide a password.'],
		trim: true,
		min: [5, 'Passwords must be between 5 and 16 characters'],
		max: [16, 'Passwords must be between 5 and 16 characters']
	},
	slug: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create user slug from last name and first name
UserSchema.pre('save', function (next) {
	let newSlug = `${this.lname}-${this.fname}`;
	newSlug = newSlug.toLocaleLowerCase();
	this.slug = newSlug;
	next();
});

// Middleware: Encrypt pwd using bcrypt
UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
