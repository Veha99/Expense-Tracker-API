const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./modules/users/users.routes');
const transactionsRoutes = require('./modules/transactions/transactions.routes');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.mongo_connection, {})
.then(() => {
	console.log('MongoDB connected successfully!');
})
.catch((err) => {
	console.error('MongoDB connection failed!');
	console.error(err);
});

// Model
require('./models/users.model');
require('./models/transactions.model');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionsRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000!!');
});