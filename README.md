# Expense Tracker

This is an Expense Tracker API built with Node.js, Express, and MongoDB. It allows users to register, login, and manage their income and expenses.

## Features

- User registration and login
- Authentication middleware
- Add income and expenses
- View user dashboard with total income and expenses

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/expense_tracker.git
   cd expense_tracker

2. Install the dependencies:
   npm install

3. Set up the environment variables:
   Create a .env file in the root directory and add the following variables:
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

4. Start the server:
   npm start

## API Endpoints
### User Routes
    POST /api/users/register - Register a new user
    POST /api/users/login - Login a user
    GET /api/users/dashboard - Get user dashboard with total income and expenses

### Transaction Routes
    GET /api/transactions - Get all transactions
    POST /api/transactions/add-income - Add income
    POST /api/transactions/add-expense - Add expense