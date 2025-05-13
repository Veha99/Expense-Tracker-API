const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtManager = require('../../../managers/jwtManager');

const userLogin = async (req, res) => {
    const userModel = mongoose.model('users');
    const {email, password} = req.body;
    try {
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required"); 
        }
        const getUser = await userModel.findOne({email});
        if (!getUser) {
            throw new Error("Invalid email and password1");
        }
        const comparePassword = await bcrypt.compare(password, getUser.password);
        if (!comparePassword) {
            throw new Error("Invalid email and password");
        }
        const accessToken = jwtManager(getUser);
        
        res.status(200).json({
            status: "success",
            message: "User login successfully",
            accessToken
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}


module.exports = userLogin;