const { validationResult } = require('express-validator');

function validationErrorHandler(req, res, next) {
	const errors = validationResult(req);
	const errorArr = errors.mapped();

	if (Object.keys(errorArr).length === 0) {
		next();
	} else {
		console.log(errorArr);
		res.status(400).json({
			errors: errorArr,
		});
	}
}

module.exports = { validationErrorHandler };
