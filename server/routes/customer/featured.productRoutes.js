const express = require('express');
const router = express.Router();

const {
	getFeaturedProducts,
} = require('../../controller/customer/featuredProduct');

router.get('/featured', getFeaturedProducts);

module.exports = router;
