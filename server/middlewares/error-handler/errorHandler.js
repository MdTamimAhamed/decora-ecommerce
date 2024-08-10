const createError = require('http-errors');

//404 error handler
function notFoundErrorHandler(req, res, next) {
	next(createError(404, 'Not found!'));
}

//default
function defaultErrorHandler(error, req, res, next) {
	res.status(error.status || 500).json({
		error: error.message || `Internal server error: ${err}`,
		details: error.details,
	});
}

module.exports = {
	notFoundErrorHandler,
	defaultErrorHandler,
};
