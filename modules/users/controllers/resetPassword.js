const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
    const userModel = mongoose.model('users');
    const { email, reset_code, new_password } = req.body;
    
    try {
        if (!validator.isNumeric(reset_code.toString())) {
            throw new Error('Reset code is required');
        }
        if (!validator.isNumeric(new_password.toString())) {
            throw new Error('New password is required'); 
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);
        const userEmail = await userModel.findOne({email});
        
        if (!userEmail) {
            throw new Error('User not found');
        }
        if (userEmail.resetCode === null) {
            throw new Error('Reset code is expire');
        }
        if (reset_code !== userEmail.resetCode) {
            throw new Error('Invalid reset code');
        } else {
            await userModel.updateOne({email}, {password: hashedPassword});
        }
        
        res.status(200).json({
            status:'success',
            message: 'Password reset succesfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}

module.exports = resetPassword;