const mongoose = require('mongoose');

const getTransactions = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');

	const transaction = await transactionsModel.find({user_id: req.user._id, ...req.query});

	res.status(200).json({
		status: "success",
		message: "Transactions fetched successfully",
		data: transaction
	});
}

module.exports = getTransactions;