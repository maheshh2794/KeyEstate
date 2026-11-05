
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
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
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


// Update Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, age, gender, number } = req.body;

        const userId = req.user.id;

        if (!name || !email || !gender || !number || age === undefined) {
            return res.status(400).json({
                msg: "Please provide all profile details"
            });
        }

        const existingUser = await userModel.findOne({
            email,
            _id: { $ne: userId }
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "Email already exists"
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                age,
                gender,
                number
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            msg: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.log("Profile Update Error:", error);

        res.status(500).json({
            msg: "Profile update failed",
            error: error.message
        });
    }
};

exports.updateProfile = updateProfile;
