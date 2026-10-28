
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth = async (req, res) => {
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign(
            { id: user._id },
            "secret"
        );

        res.send({
            token: token,
            gender: user.gender,
            role: user.role,
            name: user.name,
            email: user.email,
            id: user._id
        });
    } else {
        res.status(401).json({
            msg: "Login Failed"
        });
    }
};

exports.authentication = auth;
