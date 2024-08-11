const { check, validationResult } = require('express-validator');
const CustomerModel = require('../models/users/customer_model');
const createError = require('http-errors');

const customerSignupValidators = [
	check('userName')
		.isLength({ min: 1 })
		.withMessage('Username atleast 1 character required!')
		.trim(),
	check('email')
		.notEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Enter a valid email address!')
		.trim()
		.custom(async (email) => {
			try {
				const isEmailExist = await CustomerModel.findOne({ email: email });
				if (isEmailExist) {
					throw createError('Already have an account with this email!');
				}
			} catch (error) {
				throw createError(error.message);
			}
		}),
	check('phoneNumber')
		.notEmpty()
		.withMessage('Phone number is required!')
		.matches(/^(?:\+88|88)?01[3-9]\d{8}$/)
		.withMessage('Invalid phone number!')
		.trim(),
	check('gender').notEmpty().withMessage('Gender is required!'),
	check('birthday').notEmpty().withMessage('Date of birth is required!'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be 6 character!'),
	check('confirmPassword')
		.notEmpty()
		.withMessage('Re-type password!')
		.custom(async (confirmPassword, { req }) => {
			if (confirmPassword != req.body.password) {
				throw createError('Password did not match!');
			}
		}),
];

function customerSignupValidatorErrorHandler(req, res, next) {
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
	customerSignupValidators,
	customerSignupValidatorErrorHandler,
};
