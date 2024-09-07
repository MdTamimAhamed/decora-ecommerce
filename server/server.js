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


app.use('/hello', (req, res) => {
	res.send('Backend is working on vercel');
});

// routes
// app.use('/customer', customerRoutes);
// app.use('/seller', sellerRoutes);
// app.use('/api', authRoutes);


//error handle
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);

//listen
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port: ${port}`);
});

module.exports = app;
