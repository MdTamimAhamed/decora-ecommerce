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




app.use(cors({
  origin: 'https://decora-ecommerce-client.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'X-Auth-Token',
    'X-Custom-Header'
  ]
}));

//db
const database = mongoose
	.connect(
		'mongodb+srv://database_tamim:DB.24_zan_cluster0.1@cluster0.ojxut.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
	)
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
app.use('/customer', customerRoutes);
app.use('/seller', sellerRoutes);
// app.use('/api', authRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://decora-ecommerce-client.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//error handle
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);

//listen
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port: ${port}`);
});
