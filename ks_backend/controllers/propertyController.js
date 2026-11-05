
const Property = require("../models/propertyModel");
const cloudinary = require("../config/cloudinary");

const addProperty = async (req, res) => {

    try {

        let imageUrls = [];

        // Upload image to Cloudinary
        if (req.file) {

            const result = await new Promise((resolve, reject) => {

                cloudinary.uploader.upload_stream(
                    {
                        folder: "keyestate/properties",
                        resource_type: "image"
                    },
                    (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }

                    }
                ).end(req.file.buffer);

            });

            imageUrls.push(result.secure_url);
        }

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

            images: imageUrls,

            amenities: JSON.parse(req.body.amenities || "[]"),

            listedBy: req.user.id

        });

        const savedProperty = await newProperty.save();

        res.status(201).json({
            message: "Property Added Successfully",
            property: savedProperty
        });

    } catch (error) {

        console.log("Property Upload Error:", error);

        res.status(500).json({
            message: "Property upload failed",
            error: error.message
        });

    }
};


const getProperties = async (req, res) => {

    const properties = await Property.find();

    res.status(200).json(properties);
};


const deleteProperty = async (req, res) => {

    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
        return res.status(404).send("Property not found");
    }

    res.status(200).send("Property deleted successfully");
};


module.exports = {
    addProperty,
    getProperties,
    deleteProperty
};
