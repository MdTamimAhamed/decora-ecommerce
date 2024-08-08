const mongoose = require('mongoose');
const { validate } = require('./customer_model');

const sellerSignupSchema = new mongoose.Schema({
	accountType: {
		type: String,
		required: true,
		enum: ['individual', 'company'],
	},
	storeName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	businessType: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: [true, 'Contact number is required!'],
		minLength: 11,
		maxLength: 13,
		validate: {
			validator: function (value) {
				return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
			},
			message: 'Enter a valid phone number!',
		},
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
		unique: true,
		match: [/.+@.+\..+/, 'Please provide a valid email address!'],
		trim: true,
	},
	birthday: {
		type: Date,
		required: [true, 'Birthday is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
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
		isVarified: {
			type: Boolean,
			default: false,
		},
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
