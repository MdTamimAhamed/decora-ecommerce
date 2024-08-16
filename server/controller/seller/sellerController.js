const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SellerModel } = require('../../models/users/seller_model');

//--------------------seller-signup-step:1-----------------//
async function emailVerify(req, res, next) {
	const { email } = req.body;
	try {
		const newSeller = new SellerModel({ email });

		await newSeller.save();

		res.status(200).json({
			message: 'A verification code has been sent to your email!',
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
	emailVerify,
	sellerLogin,
};
