const express = require('express');
const router = express.Router();

const {
	emailValidate,
	emailValidateErrorHandler,
	otpAndPasswordValidate,
	otpAndPasswordValidateErrorHandler,
} = require('../../validation/sellerSignupValidator');

const {
	sellerLoginValidators,
	sellerLoginValidatorErrorHandler,
} = require('../../validation/sellerLoginValidation');
const {
	emailVerify,
	sellerRegistration,
	resendOTP,
	sellerLogin,
} = require('../../controller/seller/sellerController');

const {
	handleStoreSetup,
	handleAddressVerification,
} = require('../../controller/seller/productsFormController');
const {
	profileImageStorage,
} = require('../../controller/uploads/uploadsControllers');

router.post(
	'/verify-email',
	emailValidate,
	emailValidateErrorHandler,
	emailVerify
);
router.post('/reset-otp', resendOTP);

router.post(
	'/register',
	otpAndPasswordValidate,
	otpAndPasswordValidateErrorHandler,
	sellerRegistration
);
router.post(
	'/login',
	sellerLoginValidators,
	sellerLoginValidatorErrorHandler,
	sellerLogin
);

router.post(
	'/products/store-setup',
	profileImageStorage.single('profileImage'),
	handleStoreSetup
);
router.post('/products/address-verification', handleAddressVerification);

module.exports = router;
