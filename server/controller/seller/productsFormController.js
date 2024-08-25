const { SellerDocumentsModel } = require('../../models/users/seller_model');
const bcrypt = require('bcrypt');

async function handleStoreSetup(req, res, next) {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const { storeName, storeSubtitle, sellerId } = req.body;
		const storeSetup = new SellerDocumentsModel({
			sellerId,
			storeName,
			storeSubtitle,
			profileImage: req.file.filename,
		});

		const savedStoreSetup = await storeSetup.save();
		res.status(200).json({
			message: ['File uploaded successfully!', 'Saved!'],
			sellerDocumentId: savedStoreSetup._id,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

async function handleAddressVerification(req, res, next) {
	try {
		const { country, district, area, postCode, address, sellerDocumentId } =
			req.body;

		const newAddress = await SellerDocumentsModel.findOneAndUpdate(
			{
				_id: sellerDocumentId,
			},
			{
				address: {
					country,
					district,
					area,
					postCode,
					address,
				},
			},
			{ new: true }
		);

		if (!newAddress) {
			res
				.status(404)
				.json({ message: 'Something went wrong! Seller not found!' });
		}

		res.status(200).json({ message: 'Saved!' });
	} catch (error) {
		next(error);
	}
}

async function handleNIDVerification(req, res, next) {
	try {
		if (!req.files) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}
		const { sellerDocumentId, nidName, nidNumber } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedNidNumber = await bcrypt.hash(nidNumber, salt);

		const newNid = await SellerDocumentsModel.findOneAndUpdate(
			{ _id: sellerDocumentId },
			{
				nidInformation: {
					nidFront: req.files.nidFront[0].filename,
					nidBack: req.files.nidBack[0].filename,
					nidName,
					nidNumber: hashedNidNumber,
				},
			},
			{ new: true }
		);

		if (!newNid) {
			res
				.status(404)
				.json({ message: 'Something went wrong! Seller not found!' });
		}
		res.status(200).json({ message: 'Saved!' });
	} catch (error) {
		next(error);
	}
}

async function handleBankDetails(req, res, next) {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const {
			accountName,
			accountNumber,
			bankName,
			branchName,
			sellerDocumentId,
		} = req.body;
		const salt = await bcrypt.genSalt(10);
		const hashedAccountNumber = await bcrypt.hash(accountNumber, salt);

		const newBankDetails = await SellerDocumentsModel.findOneAndUpdate(
			{ _id: sellerDocumentId },
			{
				bankInformation: {
					bankStatement: req.file.filename,
					accountName,
					accountNumber: hashedAccountNumber,
					bankName,
					branchName,
				},
				isSellerVerified: true,
			},
			{ new: true }
		);

		if (!newBankDetails) {
			res
				.status(404)
				.json({ message: 'Something went wrong! Seller not found!' });
		}

		res.status(200).json({ message: 'Saved!' });
	} catch (error) {
		next(error);
	}
}

async function confirmVerification(req, res, next) {
	try {
		const { sellerId } = req.body;
		const getConfirmation = await SellerDocumentsModel.findOne(
			{
				sellerId: sellerId,
			},
			'isSellerVerified'
		);

		if (!getConfirmation) {
			res.status(400).json({ message: 'Seller document not found!' });
		} else {
			res.status(200).json({
				message: 'Seller is verified!',
				verified: getConfirmation.isSellerVerified,
			});
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	handleStoreSetup,
	handleAddressVerification,
	handleNIDVerification,
	handleBankDetails,
	confirmVerification,
};
