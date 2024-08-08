const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { SellerModel } = require('../../models/users/seller_model');

//--------------------seller-signup-----------------//
async function sellerSignup(req, res, next) {
	const { password, confirmPassword } = req.body;

	if (confirmPassword !== password) {
		next(createError(400, 'Password do not match!'));
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const newSeller = SellerModel({
			...req.body,
			password: hashPassword,
		});

		await newSeller.save();
		res.status(200).json({
			message: 'Signup successful!',
		});
	} catch (error) {
		next(error);
	}
}

//------------------seller-login---------------------//
async function sellerLogin(req, res, next) {
	try {
		const { email, password } = req.body;
		const isUserExist = await SellerModel.findOne({ email: email });

		if (isUserExist) {
			const isPassValid = await bcrypt.compare(password, isUserExist.password);
			if (isPassValid) {
				const sellerInfo = {
					accountType: isUserExist.accountType,
					email: isUserExist.email,
					contactNumber: isUserExist.contactNumber,
					_id: isUserExist._id,
					role: 'seller',
				};

				//token
				const token = jwt.sign(sellerInfo, process.env.SECRETE_STRING, {
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
			res.statuse(404).json({
				message: 'User not found!',
			});
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	sellerSignup,
	sellerLogin,
};
