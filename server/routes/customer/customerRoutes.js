const express = require('express');
const {
	customerLogin,
	customerSignup,
} = require('../../controller/customer/customerController');

const router = express.Router();

router.post('/signup', customerSignup);
router.post('/login', customerLogin);

module.exports = router;
