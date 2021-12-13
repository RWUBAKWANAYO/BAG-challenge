const PostList = require('../models/PostList');
const errorResponse = require('../utils/errorResponse');
exports.GetUserList = async (req, res, next) => {
	try {
		const { user_id } = req.headers;
		if (!user_id) {
			return next(new errorResponse('no data', 401));
		}
		const data = await PostList.find({ owner: user_id }).populate('country').sort({"createdAt": -1});
		res.json({ data });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
