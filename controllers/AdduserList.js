const errorResponse = require('../utils/errorResponse');
const Post = require('../models/PostList');
exports.AddUserList = async (req, res, next) => {
	try {
		const { country } = req.body;
		if (!country) {
			return next(new errorResponse('please provide country', 401));
		}
		const PostList = new Post({
			country,
			owner: req.user,
		});
		const data = await PostList.save();
		res.json({ data });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
