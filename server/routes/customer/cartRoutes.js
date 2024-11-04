const express = require('express');
const router = express.Router();
const {
	addToCart,
	getCartItems,
} = require('../../controller/cart/cartController');

router.post('/add-to-cart', addToCart);
router.get('/get-cart-items', getCartItems);

module.exports = router;
