const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    balance: {
        type: Number,
        require: [true, "Balance is required"],
        default: 0,
    },
    resetCode: {
        type: Number,
        default: null,
    }
}, {
    timestamps: true,
});
const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;