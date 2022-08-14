// import jwt
const jwt = require("jsonwebtoken");

const jwtConfig = require("../configs/jwt");

const jwtAuthorization = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token not valid",
        });
    }
};

module.exports = {
    jwtAuthorization,
};
