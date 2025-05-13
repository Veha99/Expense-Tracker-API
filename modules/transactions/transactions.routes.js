const express = require('express');
const auth = require('../../middleware/auth');
const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addExpense');
const getTransactions = require('./controllers/getTransactions');

const transactionsRoute = express.Router();

// Middleware
transactionsRoute.use(auth);
// Protected Routes
transactionsRoute.get('/', getTransactions);
transactionsRoute.post('/addIncome', addIncome);
transactionsRoute.post('/addExpense', addExpense);

module.exports = transactionsRoute;