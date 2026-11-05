
const userModel = require("../models/userModel");

const addUser = async (req, res) => {
    try {
        const {
            name,
            age,
            gender,
            role,
            email,
            number,
            password
        } = req.body;

        // Check required fields
        if (
            !name ||
            !age ||
            !gender ||
            !role ||
            !email ||
            !number ||
            !password
        ) {
            return res.status(400).json({
                msg: "Please provide all required details"
            });
        }

        // Check whether email already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already registered"
            });
        }

        // Create new user
        const newUser = new userModel({
            name,
            age: Number(age),
            gender,
            role,
            email,
            number,
            password
        });

        await newUser.save();

        res.status(201).json({
            msg: "User Registered Successfully"
        });

    } catch (error) {
        console.error("Registration Error:", error);

        res.status(500).json({
            msg: "Registration Failed",
            error: error.message
        });
    }
};

module.exports = {
    addUser
};
