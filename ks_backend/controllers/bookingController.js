
const Booking = require("../models/bookingModel");

const addBooking = (req, res) => {
    console.log(req.body)
    const { property, user, owner, message } = req.body;

    const bookings = Booking({
        property: property,
        user: user,
        owner: owner,
        message: message
    })

    bookings.save()
    res.send({ msg: "Booking Added" })

};

const getBookingsbyUser = async (req, res) => {
    const bookings = await Booking.find({
        user: req.params.userid
    })
    console.log(bookings)
    res.send(bookings)
};

const getBookingsbySeller = async (req, res) => {
    const bookings = await Booking.find({
        owner: req.params.sellerid
    })
    console.log(bookings)
    res.send(bookings)
};


const deleteBookings = async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
        return res.status(404).send({
            msg: "Booking not found"
        });
    }

    res.send({
        msg: "Booking deleted successfully"
    });
};

const updateBookingStatus = async (req, res) => {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: status },
        { new: true }
    );

    res.send(booking);
};

const confirmBooking = async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
        return res.status(404).send({ msg: "Booking not found" });
    }

    // Confirm selected booking
    booking.status = "Confirmed";
    await booking.save();

    // Cancel other pending bookings for the same property
    await Booking.updateMany(
        {
            property: booking.property,
            _id: { $ne: id },
            status: "Pending"
        },
        {
            $set: { status: "Cancelled" }
        }
    );

    res.send({ msg: "Booking confirmed and other requests cancelled" });
};

module.exports = {
    addBooking,
    getBookingsbyUser,
    getBookingsbySeller,
    deleteBookings,
    updateBookingStatus,
    confirmBooking
};