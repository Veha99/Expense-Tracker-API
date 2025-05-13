const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const userDashboard = require('./controllers/userDashboard');
const auth = require('../../middleware/auth');

const userRoutes = express.Router();

// Route
userRoutes.post('/register', register);
userRoutes.post('/login', login);
// Middleware
userRoutes.use(auth);
// Protected route
userRoutes.get('/dashboard', userDashboard);

module.exports = userRoutes;