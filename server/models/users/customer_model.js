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
});

const CustomerModel = mongoose.model('customer', customerSchema);

module.exports = CustomerModel;
