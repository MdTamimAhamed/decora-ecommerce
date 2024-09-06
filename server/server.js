const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {
	notFoundErrorHandler,
	defaultErrorHandler,
} = require('./middlewares/error-handler/errorHandler');

const customerRoutes = require('./routes/customer/customerRoutes');
const sellerRoutes = require('./routes/seller/sellerRoutes');
const authRoutes = require('./routes/seller/authRoutes');

const app = express();
dotenv.config();
const port = process.env.PORT;

//db
const database = mongoose
	.connect(
		'mongodb+srv://database_tamim:DB.24_zan_cluster0.1@cluster0.ojxut.mongodb.net/'
	)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.json('Hello');
});

app.use(express.json());
app.use(
	cors({
		origin: [
			'https://decora-ecommerce-r8329v81b-mdtamimahameds-projects.vercel.app',
		],
		methods: ['POST', 'GET'],
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
// app.use('/customer', customerRoutes);
// app.use('/seller', sellerRoutes);
// // app.use('/api', authRoutes);

// //error handle
// app.use(notFoundErrorHandler);
// app.use(defaultErrorHandler);

//listen
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port: ${port}`);
});
