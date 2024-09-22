const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
	sellerUploads,
} = require('../../middlewares/multer/uploadsControllers');
const { addProduct } = require('../../controller/seller/addProduct');
const {
	validationErrorHandler,
} = require('../../middlewares/error-handler/validationErrorHandler');
const {
	addProductValidators,
} = require('../../validation/product-validators/addProductValidationRules');

router.post(
	'/add',
	sellerUploads.fields([
		{ name: 'cover' },
		{ name: 'images' },
		{ name: 'varientImages' },
	]),
	addProductValidators,
	validationErrorHandler,
	addProduct
);

module.exports = router;
