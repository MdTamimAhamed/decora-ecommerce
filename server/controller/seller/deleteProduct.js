const { sellerProductModel } = require('../../models/products/seller.products');

async function deleteProductsByProductId(req, res, next) {
	try {
		const productId = req.params.prod_id;
		if (productId) {
			const products = await sellerProductModel.deleteOne({
				productCode: productId,
			});
			res
				.status(200)
				.json({ message: 'Product deleted successfully!', products });
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
}

async function deleteProductImage(req, res, next) {
	try {
		const productCode = req.params.prod_id;
		const image_url = req.body.image_url;
		if (productCode) {
			const products = await sellerProductModel.find({
				productCode: productCode,
			});
			if (products) {
				const { images } = products[0].productBasicInformation.productImage;
				if (images.includes(image_url)) {
					await sellerProductModel.updateOne(
						{ productCode: productCode },
						{
							$pull: {
								'productBasicInformation.productImage.images': image_url,
							},
						}
					);
				} else {
					return res.status(200);
				}
			} else {
				return res.status(404).json({ message: 'No product found!' });
			}
		} else {
			return res.status(404).json({ message: 'No product code found!' });
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = { deleteProductsByProductId, deleteProductImage };
