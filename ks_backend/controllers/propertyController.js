const Property = require("../models/propertyModel")


const addProperty = async (req, res) => {
    try {
        const newProperty = new Property({
            ...req.body
        });

        const savedProperty = await newProperty.save();

        res.status(201).json({
            message: "Property Added Successfully",
            property: savedProperty
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to Add Property",
            error: error.message
        });
    }
};

module.exports = {
    addProperty
}