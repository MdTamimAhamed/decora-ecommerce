const express = require('express');
const router = express.Router();
const {
	addToCart,
	getCartItems, deleteCartItem,
} = require('../../controller/cart/cartController');

router.post('/add-to-cart', addToCart);
router.get('/get-cart-items', getCartItems);
router.delete('/delete-cart-item', deleteCartItem);

module.exports = router;
