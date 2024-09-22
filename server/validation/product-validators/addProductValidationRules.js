const { body, check } = require('express-validator');

const addProductValidators = [
	check('cover').notEmpty().withMessage('Product cover image is required!'),
	check('images').notEmpty().withMessage('Upload atleast 1 product image!'),
	check('englishTitle').notEmpty().withMessage('Title is required!'),
	check('banglaTitle').optional(),
	check('category').notEmpty().withMessage('Select product category!'),
	check('material').notEmpty().withMessage('Product material name is missing!'),
	check('productPrice').notEmpty().withMessage('Product price is required!'),
	check('discountPrice').optional(),
	check('colorFamily')
		.notEmpty()
		.withMessage('Provide a default color or multiple!'),
	check('height')
		.notEmpty()
		.withMessage('Provide a default color or multiple!'),
];

module.exports = {
	addProductValidators,
};
