const mongoose = require('mongoose');

const userDashboard = async (req, res) => {
	const userModel = mongoose.model('users');
	const transactionsModel = mongoose.model('transactions');

	const getUser = await userModel
		.findOne({ _id: req.user._id })
		.select('name email balance');

	const getTransaction = await transactionsModel
		.find({ user_id: req.user._id })
		.select("amount transaction_type remark -_id")
		.sort("-createdAt");

	const getTotalTransaction = (tran_type) => {
		const sumTransaction = getTransaction
			.filter((item) => item.transaction_type === tran_type)
			.map((item) => item.amount)
			.reduce((acc, val) => acc + val, 0);
		return sumTransaction;
	};

	const getTotalExpense = getTotalTransaction("expense");
	const getTotalIncome = getTotalTransaction("income");

	res.status(200).json({
		status: "success",
		message: "User dashboard successfully",
		data: { 
			...getUser.toObject(), 
			total_income: getTotalIncome, 
			total_expense: getTotalExpense 
		},
		transaction: getTransaction,
	});
};

module.exports = userDashboard;