const express = require('express');
const {
	sellerSignup,
	sellerLogin,
} = require('../../controller/seller/sellerController');

const router = express.Router();

router.post('/signup', sellerSignup);
router.post('/login', sellerLogin);

module.exports = router;
