const express = require('express');
const router = express.Router();

const {
	EmailValidate,
	EmailValidateErrorHandler,
	OTPAndPasswordValidate,
	OTPAndPasswordValidateErrorHandler,
} = require('../../validation/sellerSignupValidator');

router.post('/verify-email', EmailValidate, EmailValidateErrorHandler);

module.exports = router;
