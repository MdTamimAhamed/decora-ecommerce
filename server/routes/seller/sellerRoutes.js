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

const { authMiddleware } = require('../../middlewares/auth/authMiddleware');
const {
	sellerUploads,
} = require('../../middlewares/multer/uploadsControllers');
const {
	storeSetupValidators,
	addressValidators,
	nidValidators,
	bankDetailsValidators,
} = require('../../validation/customer-verification-validators/validationRules');
const {
	validationErrorHandler,
} = require('../../middlewares/error-handler/validationErrorHandler');

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
	validationErrorHandler,
	sellerLogin
);

//----------------------------------------------------------//
router.post(
	'/products/store-setup',
	sellerUploads.single('profileImage'),
	storeSetupValidators,
	validationErrorHandler,
	handleStoreSetup
);

//----------------------------------------------------------//
router.post(
	'/products/address-verification',
	addressValidators,
	validationErrorHandler,
	handleAddressVerification
);

//----------------------------------------------------------//
router.post(
	'/products/nid-verification',
	sellerUploads.fields([
		{ name: 'nidFront', maxCount: 1 },
		{ name: 'nidBack', maxCount: 1 },
	]),
	nidValidators,
	validationErrorHandler,
	handleNIDVerification
);

//----------------------------------------------------------//

router.post(
	'/products/bank-details',
	sellerUploads.single('bankStatement'),
	bankDetailsValidators,
	validationErrorHandler,
	handleBankDetails
);

//----------------------------------------------------------//
router.get(
	'/confirm-verification',
	authMiddleware('seller'),
	confirmVerification
);

module.exports = router;
