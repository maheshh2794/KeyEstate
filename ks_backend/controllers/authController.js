
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const auth = async (req, res) => {
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign(user.name, "secret")

        // Send token as JSON
        res.json({ token: token })
    } else {
        res.status(401).json({ msg: "Login Failed" })
    }
}

exports.authentication = auth
