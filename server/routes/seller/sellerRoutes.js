const express = require('express');
const router = express.Router();

const {
	emailValidate,
	emailValidateErrorHandler,
	otpAndPasswordValidate,
	otpAndPasswordValidateErrorHandler,
} = require('../../validation/sellerSignupValidator');
const { emailVerify } = require('../../controller/seller/sellerController');

router.post(
	'/verify-email',
	emailValidate,
	emailValidateErrorHandler,
	emailVerify
);

module.exports = router;
