const { sellerProductModel } = require('../../models/products/seller.products');
const { SellerDocumentsModel } = require('../../models/users/seller_model');

//-----------------get all product of a seller by seller_id---------------//
async function getProductsBySellerId(req, res, next) {
	try {
		const sellerId = req.params.seller_id;
		if (sellerId) {
			const products = await sellerProductModel.find({ sellerId: sellerId });
			return res.status(200).json({ success: true, products });
		}
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch products!',
			error: error.message,
			success: false,
		});
	}
}

//---------------get specific product of a seller by prod_code--------------//
async function getProductsByProductId(req, res, next) {
	try {
		const productId = req.params.prod_id;

		if (productId) {
			const products = await sellerProductModel.find({
				productCode: productId,
			});

			if (products) {
				const sellerId = products?.[0]?.sellerId;
				const seller = await SellerDocumentsModel.find({
					sellerId: sellerId,
				});
				return res.status(200).json({ success: true, products, seller });
			}
		}
	} catch (error) {
		res.status(500).json({
			message: 'Failed to fetch products!',
			error: error.message,
			success: false,
		});
	}
}

module.exports = { getProductsBySellerId, getProductsByProductId };
