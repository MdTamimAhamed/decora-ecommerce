const mongoose = require('mongoose');
const { validate } = require('./customer_model');

const sellerSchema = new mongoose.Schema({
	storeName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
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
});
