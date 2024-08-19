const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SellerModel } = require('../../models/users/seller_model');
const Mailjet = require('node-mailjet');
require('dotenv').config();

//---------------------step1:Email verification-----------------//
async function emailVerify(req, res, next) {
	const { email, resend = false } = req.body;
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const otpExpire = new Date(Date.now() + 2 * 60 * 1000).toISOString();
	console.log(email, resend);

	const mailjet = Mailjet.apiConnect(
		process.env.MAILJET_API_KEY,
		process.env.MAILJET_SECRET_KEY
	);
	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: 'tamimahamed016@gmail.com',
					Name: 'Decora.app',
				},
				To: [
					{
						Email: `${email}`,
					},
				],
				Subject: 'Decora OTP email verification!',
				TextPart: 'Hello,',
				HTMLPart: `<p>Here is your verification code (OTP) : <h4> ${otp} </h4> <br> Thank you for using Decora!</p>`,
			},
		],
	});
	request
		.then((result) => {
			console.log(result.body);
		})
		.catch((err) => {
			console.log(err.statusCode);
		});

	try {
		const newSeller = new SellerModel({
			email,
			otp: {
				otpValue: otp,
			},
		});

		await newSeller.save();
		setTimeout(async () => {
			const isSellerExist = await SellerModel.findOne({ email });
			if (isSellerExist && isSellerExist.otp.otpValue) {
				isSellerExist.otp.otpValue = undefined;
				await isSellerExist.save();
			} else {
				console.log('Seller or OTP not found!');
			}
		}, 2 * 60 * 1000);

		res.status(200).json({
			message: 'A verification code has been sent to your email!',
			otpExpire,
			email,
		});
	} catch (error) {
		next(error);
	}
}

//------------------Resend-OTP---------------------//
async function resendOTP(req, res, next) {
	const { email } = req.body;
	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const otpExpire = new Date(Date.now() + 2 * 60 * 1000).toISOString();

	const mailjet = Mailjet.apiConnect(
		process.env.MAILJET_API_KEY,
		process.env.MAILJET_SECRET_KEY
	);
	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: 'tamimahamed016@gmail.com',
					Name: 'Decora.app',
				},
				To: [
					{
						Email: `${email}`,
					},
				],
				Subject: 'Decora OTP email verification!',
				TextPart: 'Hello,',
				HTMLPart: `<p>Here is your new verification code (OTP) : <h4> ${otp} </h4> <br> Thank you for using Decora!</p>`,
			},
		],
	});
	request
		.then((result) => {
			console.log(result.body);
		})
		.catch((err) => {
			console.log(err.statusCode);
		});

	try {
		await SellerModel.findOneAndUpdate(
			{ email },
			{
				otp: {
					otpValue: otp,
				},
			},
			{ upsert: true, new: true }
		);
		setTimeout(async () => {
			const isSellerExist = await SellerModel.findOne({ email });
			if (isSellerExist && isSellerExist.otp.otpValue) {
				isSellerExist.otp.otpValue = undefined;
				await isSellerExist.save();
			} else {
				console.log('Seller or OTP not found!');
			}
		}, 2 * 60 * 1000);

		res.status(200).json({
			message: 'A new verification code has been sent to your email!',
			otpExpire,
			email,
		});
	} catch (error) {
		next(error);
	}
}

//------------------step2:Complete-registartion---------------------//
async function sellerRegistration(req, res, next) {
	const { otpValue, accountType, contactNumber, password, email } = req.body;

	try {
		const seller = await SellerModel.findOne({ email });

		if (seller && seller.otp.otpValue) {
			if (seller.otp.otpValue === otpValue) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				const updatedSeller = await SellerModel.findOneAndUpdate(
					{ email },
					{
						contactNumber,
						password: hashedPassword,
						accountType,
						otp: { otpValue: undefined, isVerified: true },
					},
					{ upsert: true, new: true }
				);
				res.status(200).json({
					message: 'Registration successfull!',
				});
			} else {
				res.status(400).json({
					message: 'OTP time expired, try again!',
				});
			}
		} else {
			res.status(404).json({ message: 'Wrong OTP or user not found!' });
		}
	} catch (error) {}
}

//------------------seller-login---------------------//
async function sellerLogin(req, res, next) {
	try {
		const { email, password } = req.body;
		const isUserExist = await SellerModel.findOne({ email });

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
			res.status(404).json({
				message: 'User not found! Create an account.',
			});
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	emailVerify,
	sellerLogin,
	sellerRegistration,
	resendOTP,
	sellerLogin,
};
