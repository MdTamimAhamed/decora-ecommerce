const { sellerProductModel } = require('../../models/products/seller.products');
const { cloudinaryUpload } = require('../../utils/cloudinary');
const { v4: uuidv4 } = require('uuid');

async function updateProduct(req, res, next) {
	try {
		const productId = req.params.prod_id;
		const data = req.body;

		const product = await sellerProductModel.findOne({
			productCode: productId,
		});
		if (!product) {
			return res.status(404).json({ message: 'Product not found!' });
		}

		//-----------------Product Basic Information Update-------------------------//
		//cover image
		if (req.files && req.files.cover && req.files.cover[0]) {
			const coverUploadResponse = await cloudinaryUpload(
				req.files.cover[0].buffer,
				`product_cover_${uuidv4()}`
			);
			//updateing the cover value
			product.productBasicInformation.productImage.cover =
				coverUploadResponse.secure_url;
		}

		//product images
		let imagesUrl = [];
		if (req.files && req.files.images) {
			for (const img of req.files.images) {
				const imagesUploadResponse = await cloudinaryUpload(
					img.buffer,
					`product_image${uuidv4()}`
				);
				imagesUrl.push(imagesUploadResponse.secure_url);
			}
			if (product.productBasicInformation.productImage.images) {
				imagesUrl = [
					...product.productBasicInformation.productImage.images,
					...imagesUrl,
				];
			}
			product.productBasicInformation.productImage.images = imagesUrl;
		}

		if (data.englishTitle) {
			product.productBasicInformation.productInfo.englishTitle =
				data.englishTitle;
		}
		if (data.banglaTitle) {
			product.productBasicInformation.productInfo.banglaTitle =
				data.banglaTitle;
		}
		if (data.category) {
			product.productBasicInformation.productInfo.category = data.category;
		}
		if (data.material) {
			product.productBasicInformation.productInfo.material = data.material;
		}

		//-----------------Price Stock And Varient Update-------------------------//
		if (data.productPrice) {
			product.productPriceStockAndVarient.productPrice = data.productPrice;
		}
		if (data.discountPrice) {
			product.productPriceStockAndVarient.discountPrice = data.discountPrice;
		}
		if (data.productQuantity) {
			product.productPriceStockAndVarient.productQuantity =
				data.productQuantity;
		}
		if (data.productMeasurement) {
			product.productPriceStockAndVarient.productMeasurement = JSON.parse(
				data.productMeasurement
			);
		}

		if (req.files && req.files.varientImages) {
			//varient-images-urls
			let varientImageUrl = [];
			if (req.files.varientImages) {
				for (const varientImg of req.files.varientImages) {
					const varientImageUploadResponse = await cloudinaryUpload(
						varientImg.buffer,
						`varient_image_${uuidv4()}`
					);
					varientImageUrl.push(varientImageUploadResponse.secure_url);
				}
			}

			let colorFamilies = Array.isArray(req.body.colorFamily)
				? req.body.colorFamily
				: [req.body.colorFamily];

			//pushing colorFamily and images to single object
			const colorVarients = [];
			for (let i = 0; i < colorFamilies.length; i++) {
				const colorVarient = {
					colorFamily: colorFamilies[i],
					image: varientImageUrl[i],
				};
				colorVarients.push(colorVarient);
			}
			product.productPriceStockAndVarient.colorVarient = colorVarients;
		}

		if (data.availableFrom) {
			product.productPriceStockAndVarient.availability.from =
				data.availableFrom;
		}
		if (data.availableTo) {
			product.productPriceStockAndVarient.availability.to = data.availableTo;
		}
		if (data.deliveryTime) {
			product.productPriceStockAndVarient.deliveryTime = data.deliveryTime;
		}

		//custom oder measurements
		if (data.customOrderCheck) {
			product.productPriceStockAndVarient.customOrder.check =
				data.customOrderCheck;
		}
		if (data.customOrderCheck === 'true' && data.customOrderMeasurements) {
			const measurements = JSON.parse(data.customOrderMeasurements);
			product.productPriceStockAndVarient.customOrder.customOrderMeasurements =
				{
					minHeight: {
						value: measurements.minHeight.value,
						metric: measurements.minHeight.metric,
					},
					minWidth: {
						value: measurements.minWidth.value,
						metric: measurements.minWidth.metric,
					},
					minLength: {
						value: measurements.minLength.value,
						metric: measurements.minLength.metric,
					},
					maxHeight: {
						value: measurements.maxHeight.value,
						metric: measurements.maxHeight.metric,
					},
					maxWidth: {
						value: measurements.maxWidth.value,
						metric: measurements.maxWidth.metric,
					},
					maxLength: {
						value: measurements.maxLength.value,
						metric: measurements.maxLength.metric,
					},
				};
		}
		if (
			data.customOrderCheck === 'true' &&
			data.customDeliveryTimeCheck === 'true'
		) {
			product.productBasicInformation.customOrder.customOrderDeliveryTime =
				data.deliveryTime * 2 || 0;
		} else if (data.customDeliveryTime) {
			product.productPriceStockAndVarient.customOrder.customOrderDeliveryTime =
				data.customDeliveryTime;
		} else {
			product.productPriceStockAndVarient.customOrder.customOrderDeliveryTime = 0;
		}

		//-----------------Product Description Update-------------------------//
		if (data.productDescription) {
			product.productDescription = data.productDescription || ' ';
		}

		//-----------------Services-------------------------//
		if (data.productReturnTime) {
			product.services.productReturnTime = data.productReturnTime;
		}
		if (data.cashOnDelivery) {
			product.services.cashOnDelivery = data.cashOnDelivery;
		}
		if (data.serviceType) {
			product.services.serviceType = data.serviceType;
		}
		if (data.serviceTime) {
			product.services.serviceTime = data.serviceTime;
		}

		await product.save();
		res.status(200).json({ message: 'Product updated successfully!' });
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = { updateProduct };
