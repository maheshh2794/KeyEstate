
const Booking = require("../models/bookingModel");
const Property = require("../models/propertyModel");

const addBooking = async (req, res) => {
    const { property, visitDate, visitTime, message } = req.body;

    if (!property || !visitDate || !visitTime) {
        return res.status(400).json({
            msg: "Property, visit date and visit time are required"
        });
    }

    const propertyDetails = await Property.findById(property);

    if (!propertyDetails) {
        return res.status(404).json({
            msg: "Property not found"
        });
    }

    const newBooking = new Booking({
        property: propertyDetails._id,
        user: req.user.id,
        owner: propertyDetails.listedBy,
        visitDate,
        visitTime,
        message
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
        msg: "Booking added successfully",
        booking: savedBooking
    });
};

const getBookings = async (req, res) => {
    const bookings = await Booking.find({
        user: req.user.id
    })
        .populate("property")
        .populate("owner", "name email");

    res.status(200).json(bookings);
};

module.exports = {
    addBooking,
    getBookings
};