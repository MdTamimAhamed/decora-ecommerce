const mongoose = require('mongoose');

const sellerSignupSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	otp: {
		otpValue: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	accountType: {
		type: String,
	},
	contactNumber: {
		type: String,
	},
	password: {
		type: String,
	},
});

const sellerSchema = new mongoose.Schema({
	//---------------------setp0--------------------Store
	storeName: {
		type: String,
		require: true,
	},
	storeSubtitle: {
		type: String,
		require: true,
	},
	profileImage: {
		type: String,
		require: true,
	},

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

	//------------------------step3-------------bank information
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
