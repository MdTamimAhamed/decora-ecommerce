const { body } = require('express-validator');

//store-setup
const storeSetupValidators = [
	body('storeName').notEmpty().withMessage('Store name is required!').trim(),
	body('storeSubtitle').trim(),
];

//address-verification
const addressValidators = [
	body('country').notEmpty().withMessage('Country name is required!'),
	body('district').notEmpty().withMessage('District name is required!'),
	body('area').notEmpty().withMessage('Area name is required!'),
	body('postCode').notEmpty().withMessage('Postcode is required!').trim(),
	body('address').notEmpty().withMessage('Enter your address.').trim(),
];

//NID verification
const nidValidators = [
	body('nidName').notEmpty().withMessage('NID name is required!').trim(),
	body('nidNumber')
		.notEmpty()
		.withMessage('NID number is required!')
		.isLength({ min: 10, max: 17 })
		.withMessage(
			'Enter a valid NID number, minimum length 10 and maximum length 17!'
		)
		.trim(),
];

//bank-details
const bankDetailsValidators = [
	body('accountName')
		.notEmpty()
		.withMessage('Bank account holder name is required!')
		.trim(),
	body('accountNumber')
		.notEmpty()
		.withMessage('Bank account number is required!')
		.isLength({ min: 10, max: 17 })
		.withMessage(
			'Enter a valid account number, minimum length 10 and maximum length 17!'
		)
		.trim(),
	body('bankName').notEmpty().withMessage('Bank name is required!'),
	body('branchName').notEmpty().withMessage('Branch name is required!').trim(),
];

module.exports = {
	storeSetupValidators,
	addressValidators,
	nidValidators,
	bankDetailsValidators,
};
