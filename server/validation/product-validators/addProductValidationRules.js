const { body, check } = require('express-validator');
const createError = require('http-errors');

const addProductValidators = [
	body('cover').custom((value, { req }) => {
		if (!req.files.cover) {
			throw createError('Product cover image is required!');
		}
		return true;
	}),

	body('images').custom((value, { req }) => {
		if (!req.files['images']) {
			throw createError('Upload atleast 1 product image!');
		}
		return true;
	}),
	check('englishTitle').notEmpty().withMessage('Title is required!').trim(),
	check('banglaTitle').optional().trim(),
	check('category').notEmpty().withMessage('Select product category!'),
	check('material')
		.notEmpty()
		.withMessage('Product material name is missing!')
		.trim(),
	check('productPrice').notEmpty().withMessage('Product price is required!'),
	check('discountPrice').optional(),
	check('colorFamily')
		.notEmpty()
		.withMessage('Provide a default color or multiple!')
		.trim(),

	check('deliveryTime').notEmpty().withMessage('Delivery time is required!'),

	check('productDescription')
		.notEmpty()
		.withMessage('Add product description!')
		.isLength({ min: 120 })
		.withMessage('Product description should be minimum 140 characters long!')
		.isLength({ max: 2500 })
		.withMessage('You reached maximum character limit!')
		.trim(),
	check('serviceType').notEmpty().withMessage('Add service type!'),
];

module.exports = {
	addProductValidators,
};
