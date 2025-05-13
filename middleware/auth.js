const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.replace('Bearer ', '');
        const jwt_payload = jwt.verify(accessToken, process.env.secret_key);
        req.user = jwt_payload;
    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: "Unauthorized access"
        });
        return;
    }
    next();
}

module.exports = auth;