const express = require("express")
const userModel = require("../models/userModel")
const Property = require("../models/propertyModel")


const addUser = (req, res) => {
    const newUser = userModel({ ...req.body })
    newUser.save()
    res.send("User Added")
}


const addProperty = async (req, res) => {
    const newProperty = await Property({ ...req.body })
    newProperty.save()
    res.send("Property Added")
}

module.exports = {
    addUser,
    addProperty
}