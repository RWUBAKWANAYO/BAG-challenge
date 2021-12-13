const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
exports.register = async (req, res, next) => {
	const {
		first_name,
		last_name,
		email,
		password,
		phone_number,
		date_of_birth,
		country
	} = req.body;
	const userCheck = await User.findOne({ email });
	if (userCheck!==null) {
			return next(new errorResponse('User exist', 303));
		}
	try {
		const user = await User.create({
			first_name,
			last_name,
			email,
			password,
			phone_number,
			date_of_birth,
			country
		});
		sendToken(user, 201, res);
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new errorResponse('Please provide Email and Password', 400));
	}
	try {
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return next(new errorResponse('Invalid credentials', 401));
		}
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return next(new errorResponse('Invalid credentials', 401));
		}
		sendToken(user, 200, res);
	} catch (error) {
		next(error);
	}
};

const sendToken = (user, statusCode, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
	res.status(statusCode).json({ success: true, userId: user._id, token });
};
