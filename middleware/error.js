const errorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	if (err.code === 11000) {
		const message = 'Duplicate Field Value Enter';
		error = new errorResponse(message, 400);
		return;
	}

	if (err.name === 'ValidationError') {
		const message = Object.values(err.error).map((val = val.message));
		error = new errorResponse(message, 400);
		return;
	}

	res.status(error.statusCode || 500).json({
		sucsess: false,
		error: error.message || 'Server Error',
	});
};

module.exports = errorHandler;
