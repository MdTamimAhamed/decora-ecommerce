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
const {
	getProductsBySellerId,
	getProductsByProductId,
} = require('../../controller/seller/getProduct');
const { updateProduct } = require('../../controller/seller/updateProduct');
const {
	deleteProductsByProductId,
	deleteProductImage,
} = require('../../controller/seller/deleteProduct');

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

router.get('/:seller_id', getProductsBySellerId);
router.get('/edit/:prod_id', getProductsByProductId);
router.get('/product/:prod_id', getProductsByProductId);
router.patch(
	'/edit/:prod_id',
	sellerUploads.fields([
		{ name: 'cover', maxCount: 1 },
		{ name: 'images', maxCount: 3 },
		{ name: 'varientImages', maxCount: 5 },
	]),
	updateProduct
);

router.patch('/:prod_id', deleteProductImage);
router.delete('/:prod_id', deleteProductsByProductId);

module.exports = router;
