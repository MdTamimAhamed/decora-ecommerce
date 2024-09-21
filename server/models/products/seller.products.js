const mongose = require('mongoose');

const addProduct = new mongose.Schema({
	sellerId: {
		type: mongose.Schema.Types.ObjectId,
		ref: 'Seller',
		required: true,
	},
	productCode: { type: String, required: true },
	productBasicInformation: {
		productImage: {
			cover: { type: String, required: true },
			images: { type: [String], required: true },
		},
		productInfo: {
			englishTitle: { type: String, required: true },
			banglaTitle: { type: String, required: true },
			category: { type: String, required: true },
			material: { type: String, required: true },
		},
	},
	productPriceStockAndVarient: {
		productPrice: {
			price: { type: Number, required: true },
			discountPrice: Number,
		},
		colorVarient: [
			{
				colorFamily: String,
				image: { type: String, default: null },
			},
		],
		productQuantity: { type: Number },
		productMeasurement: [
			{
				height: { type: String },
				width: { type: String },
				length: { type: String },
			},
		],
		availability: {
			from: String,
			to: String,
		},
		deliveryTime: { type: Number, required: true },
		customOrder: {
			check: Boolean,
			customOrderMeasurements: {
				minHeight: {
					value: String,
					metric: String,
				},
				minWidth: {
					value: String,
					metric: String,
				},
				minLength: {
					value: String,
					metric: String,
				},
				maxHeight: {
					value: String,
					metric: String,
				},
				maxWidth: {
					value: String,
					metric: String,
				},
				maxLength: {
					value: String,
					metric: String,
				},
			},

			customOrderDeliveryTimeCheck: Boolean,
			customOerderDeliveryTime: Number,
		},
	},
	productDescription: { type: String, required: true },
	services: {
		productReturnTime: Number,
		cashOnDelivery: Boolean,
		serviceType: String,
		serviceTime: Number,
	},
});

const sellerProductModel = mongose.model('SellerProduct', addProduct);

module.exports = { sellerProductModel };
