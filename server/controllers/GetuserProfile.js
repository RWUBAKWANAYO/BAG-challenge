const User = require('../models/User');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');
exports.GetUserProfile = async (req, res, next) => {
	try {
		let token = req.headers.authorization.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			return next(new errorResponse('user not found', 404));
		}
		const data = await User.findOne({ _id: user.id });
		res.json({ data, token });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
