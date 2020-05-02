exports.createError = (req, res, next) => {
	const error = new Error("Not Found!");
	error.status = 404;
	next(error);
};

exports.throwError = (error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
};
