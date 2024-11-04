const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {
	notFoundErrorHandler,
	defaultErrorHandler,
} = require('./middlewares/error-handler/errorHandler');

const customerRoutes = require('./routes/customer/customerRoutes');
const customerProductRoutes = require('./routes/customer/featured.productRoutes');

const cartRoutes = require('./routes/customer/cartRoutes');

const sellerRoutes = require('./routes/seller/sellerRoutes');
const sellerProductRoutes = require('./routes/seller/seller.productRoutes');

// const authRoutes = require('./routes/seller/authRoutes');

dotenv.config();
const app = express();

const port = process.env.PORT;
const allowedOrigins = ['https://decora-ecommerce-client.vercel.app'];

app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: "GET,POST,PUT,DELETE,OPTIONS",
	credentials: true,
	allowedHeaders: "Content-Type,Authorization"
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

// routes
app.use('/', (req, res) => {
	res.send('Project is running');
})
app.use('/api', customerProductRoutes);
app.use('/api/customer', customerRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/seller', sellerRoutes);
app.use('/api/products', sellerProductRoutes);
// app.use('/api', authRoutes);

//error handle
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);

//listen
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port: ${port}`);
});

module.exports = app;
