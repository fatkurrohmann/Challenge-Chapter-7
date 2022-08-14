// import jwt
const jwt = require("jsonwebtoken");

// import konfigurasi
const jwtConfig = require("../config/jwt");

// import models
const database = require("../models");

// fungsi login
const login = async (req, res) => {
    const data = await database.user_game.findOne({
        where: { email: req.body.email },
    });

    // jika user dan password tidak sesuai
    if (!data.email == req.body.email && data.password == req.body.password) {
        return res
            .status(401)
            .json({ messase: "E-mail address or password is incorrect" });
    }

    // isi token
    const tokenPayload = {
        id: data.id,
        email: data.email,
        role: data.role,
    };

    // token disimpan
    const token = jwt.sign(tokenPayload, jwtConfig.JWT_SECRET);

    // respon login berhasil
    res.json({
        message: "Login successful",
        token: token,
    });

    res.render("main/login");
};

module.exports = login;
