const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Rejected"],
      default: "Pending",
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;