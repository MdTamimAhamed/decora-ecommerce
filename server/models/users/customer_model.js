const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'Username is required!'],
		minLength: [4, 'Username must be at least 4 characters long'],
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
		type: String,
		required: [true, 'Birthday is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
		minLength: [6, 'Password must be atleast 6 characters!'],
	},
});

const CustomerModel = mongoose.model('customer', customerSchema);

module.exports = CustomerModel;
