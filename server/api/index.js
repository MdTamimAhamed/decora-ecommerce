const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {
	notFoundErrorHandler,
	defaultErrorHandler,
} = require('../middlewares/error-handler/errorHandler');

const customerRoutes = require('../routes/customer/customerRoutes');
const customerProductRoutes = require('../routes/customer/featured.productRoutes');

const cartRoutes = require('../routes/customer/cartRoutes');

const sellerRoutes = require('../routes/seller/sellerRoutes');
const sellerProductRoutes = require('../routes/seller/seller.productRoutes');

// const authRoutes = require('./routes/seller/authRoutes');

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(cors({
	origin: 'https://decora-ecommerce-client.vercel.app',
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	credentials: true,
	allowedHeaders: "Content-Type, Authorization"
}));




//db
const isMode = process.env.NODE_ENV === 'development';
const dbUri = isMode
	? process.env.CONNECTION_STRING_DEVELOPMENT
	: process.env.CONNECTION_STRING_PRODUCTION;

const database = mongoose
	.connect(dbUri)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api', customerProductRoutes);
app.use('/api/customer', customerRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/seller', sellerRoutes);
app.use('/api/products', sellerProductRoutes);

app.use('/api', (req, res) => {
	res.send('Project is running');
});

//error handle
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);

//listen
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port: ${port}`);
});

module.exports = app;
