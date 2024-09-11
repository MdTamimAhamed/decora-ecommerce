const { check } = require('express-validator');

const sellerLoginValidators = [
	check('email').notEmpty().withMessage('Enter your email!'),
	check('password').notEmpty().withMessage('Enter password!'),
];

module.exports = {
	sellerLoginValidators,
};
