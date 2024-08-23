const {
	SellerDocumentsModel,
	SellerModel,
} = require('../../models/users/seller_model');

async function handleStoreSetup(req, res, next) {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const { storeName, storeSubtitle } = req.body;
		const storeSetup = new SellerDocumentsModel({
			storeName,
			storeSubtitle,
			profileImage: req.file.filename,
		});

		const savedStoreSetup = await storeSetup.save();
		res.status(200).json({
			message: ['File uploaded successfully!', 'Saved!'],
			verificationId: savedStoreSetup._id,
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
}

async function handleAddressVerification(req, res, next) {
	try {
		const { country, district, area, postCode, address, sellerId } = req.body;

		await SellerDocumentsModel.findOneAndUpdate(
			{
				sellerId: sellerId,
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
			{ new: true, upsert: true }
		);

		res.status(200).json({ message: 'Saved!' });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	handleStoreSetup,
	handleAddressVerification,
};
