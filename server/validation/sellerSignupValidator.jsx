const { check, validationResult } = require('express-validator');
const createError = require('http-errors');

const EmailValidate = [
	check('email')
		.notEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Enter a valid email address!')
		.trim(),
];

const OTPAndPasswordValidate = [
	check('otpValue').notEmpty().withMessage('Enter OTP vlaue!'),
	check('otpExpire')
		.isISO8601()
		.toDate()
		.withMessage('Invalid OTP expiry date!'),
	check('isVerified').isBoolean().withMessage('isVerified must be a boolean.'),
	check('phoneNumber')
		.notEmpty()
		.withMessage('Phone number is required!')
		.matches(/^(?:\+88|88)?01[3-9]\d{8}$/)
		.withMessage('Invalid phone number!')
		.trim(),
	check('accountType')
		.isIn(['individual', 'company'])
		.withMessage('Invalid account type!'),
	check('password')
		.notEmpty('Enter password!')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters!'),
	check('confirmPassword').custom((confirmPassword, { req }) => {
		if (confirmPassword !== req.body.password) {
			throw createError('Password do not match!');
		}
	}),
];

function EmailValidateErrorHandler(req, res, next) {
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
function OTPAndPasswordValidateErrorHandler(req, res, next) {
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
	EmailValidate,
	EmailValidateErrorHandler,
	OTPAndPasswordValidate,
	OTPAndPasswordValidateErrorHandler,
};
