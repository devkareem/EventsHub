const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
    const token = req.header('x-token-id');
    if (!token) return next(new Error('Access denied!'));
    try {
        const user = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};