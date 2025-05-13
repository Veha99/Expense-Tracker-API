const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../managers/jwtManager');

const register = async (req, res) => {
    const userModel = mongoose.model('users');

    const {name, email, password, balance } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const findEmail = await userModel.findOne({email});
        if (findEmail) {
            throw new Error("Email already exists");
        }
        if (password.length < 4) {
            throw new Error("Password must be at least 4 characters")
        }
        if (balance < 0 || balance === '') {
            throw new Error("Balance must be greater or equal to 0")
        }
        const createdUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            balance
        });
        const accessToken = jwtManager(createdUser);
        res.status(200).json({
            status: "success",
            message: "Register successful",
            token: accessToken
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

module.exports = register;
