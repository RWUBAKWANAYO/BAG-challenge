const PostList = require('../models/PostList');
const errorResponse = require('../utils/errorResponse');
exports.DeleteUserList = async (req, res, next) => {
	try {
		const { item_id } = req.body;
		if (!item_id) {
			return next(new errorResponse('fail to delete', 401));
		}
		const deleted_item = await PostList.findOneAndRemove({ id: item_id });
		res.json({message:"Country removed successfully", deleted_item });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
