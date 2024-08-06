const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'Username is required!'],
		minLength: 1,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required!'],
		unique: true,
		match: [/.+@.+\..+/, 'Please provide a valid email address!'],
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: [true, 'Phone number is required!'],
		validate: {
			validator: function (value) {
				return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
			},
			message: 'Enter a valid phone number!',
		},
		trim: true,
	},
	gender: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		required: [true, 'Birthday is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
	},
	confirmPassword: {
		type: String,
		required: [true, 'Please re-type password!'],
	},
});

const customers = mongoose.model('customer', customerSchema);

module.exports = customers;
