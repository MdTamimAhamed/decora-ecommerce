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
	sellerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
		required: true,
	},
	//---------------------setp0--------------------Store
	storeName: {
		type: String,
	},
	storeSubtitle: {
		type: String,
	},
	profileImage: {
		type: String,
		required: true,
	},

	//---------------------setp1--------------------address
	address: {
		country: {
			type: String,
		},
		district: {
			type: String,
		},
		area: {
			type: String,
		},
		postCode: {
			type: String,
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
		},
		nidBack: {
			type: String,
		},
		nidName: {
			type: String,
		},
		nidNumber: {
			type: String,
		},
	},

	//------------------------step3-------------bank information
	bankInformation: {
		bankStatement: {
			type: String,
		},
		accountName: {
			type: String,
		},
		accountNumber: {
			type: String,
		},
		bankName: {
			type: String,
		},
		branchName: {
			type: String,
		},
	},
	isSellerVerified: {
		type: Boolean,
		default: false,
	},
});

const SellerModel = mongoose.model('Seller', sellerSignupSchema);
const SellerDocumentsModel = mongoose.model('SellerDocument', sellerSchema);

module.exports = {
	SellerModel,
	SellerDocumentsModel,
};
