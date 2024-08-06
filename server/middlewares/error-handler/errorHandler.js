const createError = require('http-errors');

//404 error handler
function notFoundErrorHandler(req, res, next) {
	next(createError(404, 'Not found!'));
}

//default
function defaultErrorHandler(err, req, res, next) {
	res.status(500).json({ error: `Internal server error: ${err}` });
}

module.exports = {
	notFoundErrorHandler,
	defaultErrorHandler,
};
