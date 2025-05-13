const mongoose = require('mongoose');
const validator = require('validator');

const addExpense = async (req, res) => {
  const transactionsModel = mongoose.model('transactions');
  const userModel = mongoose.model('users');
  const { amount, remark } = req.body;

  try {
    if (!amount || amount < 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!validator.isNumeric(amount.toString())) {
      throw new Error('Amount must be a valid number');
    }
    await transactionsModel.create({
      user_id: req.user._id,
      amount,
      transaction_type: "expense",
      remark
    });

    await userModel.updateOne(
      { _id: req.user._id },
      { $inc: { balance: -amount } },
      { runValidators: true }
    )
    res.status(200).json({
      status: "success",
      message: "Add expense successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
}

module.exports = addExpense;
