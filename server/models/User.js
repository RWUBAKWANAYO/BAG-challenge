const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'please provide first name'],
	},
	last_name: {
		type: String,
		required: [true, 'please provide last name'],
	},
	email: {
		type: String,
		required: [true, 'please provide user email'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add password'],
		minlength: 6,
		select: false,
	},
		phone_number: {
		type: Number,
		required: [true, 'please provide phone number'],
	},
		date_of_birth: {
		type: String,
		required: [true, 'please provide date of birth'],
	},
		country: {
		type: String,
		required: [true, 'please provide country']
	}
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});


const User = mongoose.model('users', UserSchema);

module.exports = User;
