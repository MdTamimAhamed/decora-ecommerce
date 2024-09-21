const { sellerProductModel } = require('../../models/products/seller.products');
const { cloudinaryUpload } = require('../../utils/cloudinary');
const { v4: uuidv4 } = require('uuid');

async function addProduct(req, res, next) {
	try {
		if (!req.file && !req.files) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const { englishTitle, banglaTitle, category, material } = req.body;

		//cover image
		let coverUrl = '';
		if (req.files.cover[0]) {
			const coverUploadResponse = await cloudinaryUpload(
				req.files.cover[0].buffer,
				`product_cover_${uuidv4()}`
			);
			coverUrl = coverUploadResponse.secure_url;
		}

		//product images
		let imagesUrl = [];
		if (req.files.images) {
			for (const img of req.files.images) {
				const imagesUploadResponse = await cloudinaryUpload(
					img.buffer,
					`product_image${uuidv4()}`
				);
				imagesUrl.push(imagesUploadResponse.secure_url);
			}
		}

		//color-varient-images
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

		//colorFamily and images
		const colorVarients = [];
		let colorFamilies = Array.isArray(req.body.colorFamily)
			? req.body.colorFamily
			: [req.body.colorFamily];

		for (let i = 0; i < colorFamilies.length; i++) {
			const colorVarient = {
				colorFamily: colorFamilies[i],
				image: varientImageUrl[i],
			};
			colorVarients.push(colorVarient);
		}

		const { value } = req.body;

		console.log(value);

		const productCode = `PROD-id-${uuidv4()}`;

		const measurements = JSON.parse(req.body.customOrderMeasurements);

		const newProduct = new sellerProductModel({
			sellerId: req.body.sellerId,
			productCode: productCode,
			productBasicInformation: {
				productImage: {
					cover: coverUrl,
					images: imagesUrl,
				},
				productInfo: {
					englishTitle: englishTitle,
					banglaTitle: banglaTitle,
					category: category,
					material: material,
				},
			},
			productPriceStockAndVarient: {
				productPrice: {
					price: req.body.price,
					discountPrice: req.body.discountPrice,
				},
				productQuantity: req.body.productQuantity,
				productMeasurement: JSON.parse(req.body.productMeasurement),
				colorVarient: colorVarients,

				availability: {
					from: req.body.availableFrom,
					to: req.body.availableTo,
				},
				deliveryTime: req.body.deliveryTime,
				customOrder: {
					check: req.body.customOrderCheck,
					customOrderMeasurements: {
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
					},
					customOrderDeliveryTimeCheck: req.body.customDeliveryTimeCheck,
					customOerderDeliveryTime: req.body.customDeliveryTime,
				},
			},
			productDescription: req.body.productDescription,
			services: {
				productReturnTime: req.body.productReturnTime,
				cashOnDelivery: req.body.cashOnDelivery,
				serviceType: req.body.serviceType,
				serviceTime: req.body.serviceTime,
			},
		});
		await newProduct.save();
		res.status(200).json({ message: 'Product saved!' });
	} catch (error) {
		console.error(error);
		next(error);
	}
}

module.exports = { addProduct };

// const {
// 	englishTitle,
// 	banglaTitle,
// 	category,
// 	material,

// 	price,
// 	discountPrice,
// 	productQuantity,
// 	productMeasurement,
// 	availableFrom,
// 	availableTo,
// 	deliveryTime,
// 	customOrderCheck,
// 	customOrderMeasurements,
// 	customOrderDeliveryTimeCheck,
// 	customOrderDeliveryTime,

// 	productDescription,

// 	productReturnTime,
// 	cashOnDelivery,
// 	setWarranty,
// 	warrantyTime,
// } = req.body;
