const mongoose = require('mongoose');

const forgetPassword = async (req, res) => {
    const userModel = mongoose.model('users');
    const { email } = req.body;
    
    try {
        let resetCode = null;
        const userEmail = await userModel.findOne({ email});

        if (userEmail) {
            const code = Math.floor(1000 + Math.random() * 9000);
            resetCode = code;
        } else {
            throw new Error('User not found');
        }
        await userModel.updateOne({ email }, { resetCode });

        res.status(200).json({
            status: 'success',
            code: resetCode
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}

module.exports = forgetPassword;