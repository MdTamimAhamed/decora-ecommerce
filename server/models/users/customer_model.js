const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	cart: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SellerProduct',
			},
			sellerId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SellerDocument',
			},
			quantity: {
				type: Number,
			},
			colorFamily: {
				type: String,
			},
			price: {
				type: Number,
			},

			customOrder: {
				measurements: {
					height: {
						type: Number,
					},
					width: {
						type: Number,
					},
					length: {
						type: Number,
					},
					unit: {
						type: String,
					},
				},
				quantity: {
					type: Number,
				},
			},
		},
	],
});

const CustomerModel = mongoose.model('customer', customerSchema);

module.exports = CustomerModel;
