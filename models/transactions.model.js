const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transaction_type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },
    remark: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});
const transactionsModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionsModel;