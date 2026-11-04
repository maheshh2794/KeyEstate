
const Property = require("../models/propertyModel")

const addProperty = async (req, res) => {

    const newProperty = new Property({
        title: req.body.title,
        propertyType: req.body.propertyType,
        description: req.body.description,
        listingType: req.body.listingType,
        price: Number(req.body.price),

        address: {
            street: req.body.street,
            locality: req.body.locality,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        },

        bedrooms: Number(req.body.bedrooms),
        bathrooms: Number(req.body.bathrooms),
        area: Number(req.body.area),
        areaUnit: req.body.areaUnit,
        furnishing: req.body.furnishing,

        images: req.file ? [`/uploads/${req.file.filename}`] : [],

        amenities: JSON.parse(req.body.amenities || "[]"),

        listedBy: req.user.id
    })

    const savedProperty = await newProperty.save()

    res.status(201).json({
        message: "Property Added Successfully",
        property: savedProperty
    })
}

const getProperties = async (req, res) => {
    const properties = await Property.find()
    res.status(200).json(properties)
}


const deleteProperty = async (req, res) => {
    const property = await Property.findByIdAndDelete(req.params.id)

    if (!property) {
        return res.status(404).send("Property not found")
    }

    res.status(200).send("Property deleted successfully")
}

module.exports = {
    addProperty,
    deleteProperty
}


module.exports = {
    addProperty,
    getProperties,
    deleteProperty
}
