const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');
const forgetPassword = require('./controllers/forgetPassword');
const resetPassword = require('./controllers/resetPassword');
const auth = require('../../middleware/auth');

const userRoutes = express.Router();

// Route
userRoutes.post('/forget-password', forgetPassword);
userRoutes.patch('/reset-password', resetPassword);
userRoutes.post('/register', register);
userRoutes.post('/login', login);
// Middleware
userRoutes.use(auth);
// Protected route
userRoutes.get('/dashboard', userDashboard);

module.exports = userRoutes;