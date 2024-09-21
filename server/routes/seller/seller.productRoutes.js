const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
	sellerUploads,
} = require('../../middlewares/multer/uploadsControllers');
const { addProduct } = require('../../controller/seller/addProduct');

router.post(
	'/add',
	sellerUploads.fields([
		{ name: 'cover' },
		{ name: 'images' },
		{ name: 'varientImages' },
	]),
	addProduct
);

module.exports = router;
