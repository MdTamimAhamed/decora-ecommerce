const express = require('express');
const router = express.Router();

const {
	customerLogin,
	customerSignup,
} = require('../../controller/customer/customerController');
const {
	customerSignupValidators,
	customerSignupValidatorErrorHandler,
} = require('../../validation/customerSignupValidator');
const {
	customerLoginValidators,
	customerLoginValidatorErrorHandler,
} = require('../../validation/customerLoginValidator');

router.post(
	'/signup',
	customerSignupValidators,
	customerSignupValidatorErrorHandler,
	customerSignup
);
router.post(
	'/login',
	customerLoginValidators,
	customerLoginValidatorErrorHandler,
	customerLogin
);

module.exports = router;
