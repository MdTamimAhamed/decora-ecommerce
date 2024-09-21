const { sellerProductModel } = require('../../models/products/seller.products');

async function getFeaturedProducts(req, res, next) {
	try {
		const products = await sellerProductModel.find({});
		res.status(200).json({ success: true, products });
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch products!',
			error: error.message,
			success: false,
		});
	}
}

module.exports = { getFeaturedProducts };
