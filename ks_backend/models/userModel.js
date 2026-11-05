
const mongoose = require("mongoose")

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    createdat: {
        type: Date,
        default: () => new Date(Date.now() + (5.5 * 60 * 60 * 1000))
    }
});

const userModel = model("User", userSchema);

module.exports = userModel;
