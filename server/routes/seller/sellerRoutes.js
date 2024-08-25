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
	handleNIDVerification,
	handleBankDetails,
	confirmVerification,
} = require('../../controller/seller/productsFormController');
const {
	sellerUploads,
} = require('../../controller/uploads/uploadsControllers');
const { authMiddleware } = require('../../middlewares/auth/authMiddleware');

//------------------------Routes----------------------------//
//----------------------------------------------------------//
router.post(
	'/verify-email',
	emailValidate,
	emailValidateErrorHandler,
	emailVerify
);

//----------------------------------------------------------//
router.post('/reset-otp', resendOTP);

//----------------------------------------------------------//
router.post(
	'/register',
	otpAndPasswordValidate,
	otpAndPasswordValidateErrorHandler,
	sellerRegistration
);

//----------------------------------------------------------//
router.post(
	'/login',
	sellerLoginValidators,
	sellerLoginValidatorErrorHandler,
	sellerLogin
);

//----------------------------------------------------------//
router.post(
	'/products/store-setup',
	sellerUploads.single('profileImage'),
	handleStoreSetup
);

//----------------------------------------------------------//
router.post('/products/address-verification', handleAddressVerification);

//----------------------------------------------------------//
router.post(
	'/products/nid-verification',
	sellerUploads.fields([
		{ name: 'nidFront', maxCount: 1 },
		{ name: 'nidBack', maxCount: 1 },
	]),
	handleNIDVerification
);

//----------------------------------------------------------//

router.post(
	'/products/bank-details',
	sellerUploads.single('bankStatement'),
	handleBankDetails
);

//----------------------------------------------------------//
router.get(
	'/confirm-verification',
	authMiddleware('seller'),
	confirmVerification
);

module.exports = router;
