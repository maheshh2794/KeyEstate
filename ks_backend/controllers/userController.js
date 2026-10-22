const express = require("express")
const userModel = require("../models/userModel")
const Property = require("../models/propertyModel")


const addUser = (req, res) => {
    const newUser = userModel({ ...req.body })
    newUser.save()
    res.send("User Added")
}

module.exports = {
    addUser
}