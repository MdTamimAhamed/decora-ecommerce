const { sellerProductModel } = require('../../models/products/seller.products');
const CustomerModel = require('../../models/users/customer_model');
const { SellerDocumentsModel } = require('../../models/users/seller_model');

const addToCart = async (req, res, next) => {
	try {
		const {
			prod_id,
			customer_id,
			seller_id,
			product_price,
			customerOrderData,
		} = req.body;

		const { height, width, length, metric, customQuantity } =
			customerOrderData?.customOrder || {};
		const { quantity, colorFamily, customOrderCheck, onlyCustomOrderCheck } =
			customerOrderData || {};

		if (!prod_id) {
			return res.status(400).json({ message: 'Product ID is required' });
		}
		if (!customer_id) {
			return res.status(400).json({ message: 'Customer ID is required' });
		}

		const customer = await CustomerModel.findById(customer_id);
		if (!customer) {
			return res.status(404).json({ message: 'Customer not found' });
		}
		//--------only for custom order--------//
		const newCustomCartItem = {
			productId: prod_id,
			sellerId: seller_id,
			colorFamily: colorFamily || '',
			price: product_price,
		};
		if (onlyCustomOrderCheck) {
			newCustomCartItem.customOrder = {
				measurements: {
					height: height || null,
					width: width || null,
					length: length || null,
					unit: metric || '',
				},
				quantity: customQuantity || 1,
			};
			customer.cart.push(newCustomCartItem);
		}

		//--------for regular order + custom order--------//
		const newRegularAndCustomCartItem = {
			productId: prod_id,
			sellerId: seller_id,
			quantity: quantity || 1,
			colorFamily: colorFamily || '',
			price: product_price,
		};
		if (customOrderCheck) {
			newRegularAndCustomCartItem.customOrder = {
				measurements: {
					height: height || null,
					width: width || null,
					length: length || null,
					unit: metric || '',
				},
				quantity: customQuantity || 1,
			};
			customer.cart.push(newRegularAndCustomCartItem);
		}

		//--------only for regular order--------//
		const newRegularCartItem = {
			productId: prod_id,
			sellerId: seller_id,
			quantity: quantity || 1,
			colorFamily: colorFamily || '',
			price: product_price,
		};
		if (!customOrderCheck && !onlyCustomOrderCheck) {
			customer.cart.push(newRegularCartItem);
		}

		await customer.save();

		res.status(200).json({ message: 'Product added to cart successfully' });
	} catch (error) {
		next(error);
	}
};

const getCartItems = async (req, res, next) => {
	try {
		const { customer_id } = req.query;

		const customer = await CustomerModel.find({ _id: customer_id });
		if (!customer) {
			return res.status(404).json({ message: 'Customer not found' });
		}
		const cart = customer[0]?.cart;
		if (!cart || cart.length === 0) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		const isSellerId = cart.map((item) => item.sellerId);
		const isProductId = cart.map((item) => item.productId);

		const seller = await SellerDocumentsModel.find({ sellerId: isSellerId });
		const product = await sellerProductModel.find({ _id: isProductId });

		res.status(200).json({
			success: true,
			customerData: customer,
			sellerData: seller,
			productData: product,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { addToCart, getCartItems };
