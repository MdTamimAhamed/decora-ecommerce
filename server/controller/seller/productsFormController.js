const { SellerDocumentsModel } = require('../../models/users/seller_model');

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

		await storeSetup.save();
		res
			.status(200)
			.json({ message: ['File uploaded successfully!', 'Saved!'] });
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = {
	handleStoreSetup,
};
