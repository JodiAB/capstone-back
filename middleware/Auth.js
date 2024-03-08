// Node.js environment using CommonJS syntax
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function createToken(user) {
    return jwt.sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    }, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
}

function verifyAToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            next();
        } catch (error) {
            res.json({
                status: res.statusCode,
                msg: "Please provide the correct credentials."
            });
        }
    } else {
        res.json({
            status: res.statusCode,
            msg: "Please login."
        });
    }
}

module.exports = {
    createToken,
    verifyAToken
};
