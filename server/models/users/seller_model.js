const mongoose = require('mongoose');
const { validate } = require('./customer_model');

const sellerSignupSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	otp: {
		otpValue: {
			type: String,
			required: true,
		},
		otpExpire: {
			type: Date,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	accountType: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const sellerSchema = new mongoose.Schema({
	//---------------------setp1--------------------address
	address: {
		country: {
			type: String,
			required: [true, 'Country is required!'],
		},
		district: {
			type: String,
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		postCode: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			trim: true,
		},
	},

	//----------------------step2----------------ID verification
	nidInformation: {
		nidFront: {
			type: String,
			required: true,
		},
		nidBack: {
			type: String,
			required: true,
		},
		nidName: {
			type: String,
			required: true,
		},
		nidNumber: {
			type: String,
			required: true,
		},
	},

	//------------------------step2-------------bank information
	bankInformation: {
		bankStatement: {
			type: String,
			required: true,
		},
		accountName: {
			type: String,
			required: true,
		},
		accountNumber: {
			type: String,
			required: true,
		},
		bankName: {
			type: String,
			required: true,
		},
		branchName: {
			type: String,
			required: true,
		},
	},
});

const SellerModel = mongoose.model('Seller', sellerSignupSchema);
const SellerDocumentsModel = mongoose.model('SellerDocument', sellerSchema);

module.exports = {
	SellerModel,
	SellerDocumentsModel,
};
