const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const CustomerModel = require('../../models/users/customer_model');

//--------------------customer-signup-----------------//
async function customerSignup(req, res, next) {
	const { password, confirmPassword } = req.body;

	if (confirmPassword !== password) {
		next(createError(400, 'Password do not match!'));
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const newCustomer = CustomerModel({
			...req.body,
			password: hashPassword,
		});

		await newCustomer.save();
		res.status(200).json({
			message: 'Signup successful!',
		});
	} catch (error) {
		next(error);
	}
}

//------------------customer-login---------------------//
async function customerLogin(req, res, next) {
	try {
		const { email, password } = req.body;
		const isUserExist = await CustomerModel.findOne({ email: email });

		if (isUserExist) {
			const isPassValid = await bcrypt.compare(password, isUserExist.password);
			if (isPassValid) {
				const customerInfo = {
					userName: isUserExist.userName,
					email: isUserExist.email,
					_id: isUserExist._id,
					role: 'customer',
				};

				//token
				const token = jwt.sign(customerInfo, process.env.SECRETE_STRING, {
					expiresIn: '10m',
				});

				//response
				res.status(200).json({
					token,
					message: 'Login successfull!',
				});
			} else {
				res.status(401).json({
					message: 'Wrong password!',
				});
			}
		} else {
			res.status(404).json({
				message: 'User not exist, create account!',
			});
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	customerSignup,
	customerLogin,
};
