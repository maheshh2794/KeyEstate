
const Property = require("../models/propertyModel");
const cloudinary = require("../config/cloudinary");

const addProperty = async (req, res) => {
    try {
        let imageUrls = [];

        // Upload multiple images to Cloudinary
        if (req.files && req.files.length > 0) {
            imageUrls = await Promise.all(
                req.files.map((file) => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "keyestate/properties",
                                resource_type: "image"
                            },
                            (error, result) => {
                                if (error) {
                                    return reject(error);
                                }

                                if (!result || !result.secure_url) {
                                    return reject(
                                        new Error("Cloudinary image upload failed")
                                    );
                                }

                                resolve(result.secure_url);
                            }
                        );

                        uploadStream.end(file.buffer);
                    });
                })
            );
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

        return res.status(201).json({
            message: "Property Added Successfully",
            property: savedProperty
        });

    } catch (error) {
        console.error("Property Upload Error:", error);

        return res.status(500).json({
            message: "Property upload failed",
            error: error.message
        });
    }
};


const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();

        return res.status(200).json(properties);

    } catch (error) {
        console.error("Get Properties Error:", error);

        return res.status(500).json({
            message: "Unable to fetch properties",
            error: error.message
        });
    }
};


const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }

        return res.status(200).json({
            message: "Property deleted successfully"
        });

    } catch (error) {
        console.error("Delete Property Error:", error);

        return res.status(500).json({
            message: "Unable to delete property",
            error: error.message
        });
    }
};


module.exports = {
    addProperty,
    getProperties,
    deleteProperty
};
