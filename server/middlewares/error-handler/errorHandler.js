const createError = require('http-errors');

//404 error handler
function notFoundErrorHandler(req, res, next) {
	next(createError(404, 'Not found!'));
}

//default
function defaultErrorHandler(err, req, res, next) {
	res.status(err.status || 500).json({
		error: err.message || `Internal server error: ${err}`,
		details: err.details,
	});
}

module.exports = {
	notFoundErrorHandler,
	defaultErrorHandler,
};
