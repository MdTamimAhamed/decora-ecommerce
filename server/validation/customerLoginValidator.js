const { check, validationResult } = require('express-validator');

const customerLoginValidators = [
	check('email').notEmpty().withMessage('Enter your email!'),
	check('password').notEmpty().withMessage('Enter password!'),
];

function customerLoginValidatorErrorHandler(req, res, next) {
	const errors = validationResult(req);
	const errorArr = errors.mapped();

	if (Object.keys(errorArr).length === 0) {
		next();
	} else {
		console.log(errorArr);
		res.status(500).json({
			errors: errorArr,
		});
	}
}

module.exports = {
	customerLoginValidators,
	customerLoginValidatorErrorHandler,
};
