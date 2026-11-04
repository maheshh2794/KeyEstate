
require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const dbconnect = require("./dbconnection/dbConnection");
const { userRegister } = require("./routes/userRouter");
const { loginRouter } = require("./routes/authRouter");

const {
    addProperty,
    getProperties,
    deleteProperty
} = require("./controllers/propertyController");

const {
    addBooking,
    getBookingsbyUser,
    deleteBookings,
    getBookingsbySeller,
    updateBookingStatus,
    confirmBooking
} = require("./controllers/bookingController");

const { addFavorites, getFavorites } = require("./controllers/favoriteController");
const userModel = require("./models/userModel");
const upload = require("./middleware/upload");

dbconnect();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "token"]
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Authentication middleware
function checkuser(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            msg: "Token is missing. Please log in."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                msg: "Invalid or expired token"
            });
        }

        req.user = decoded;
        next();
    });
}

// User routes
app.use("/", userRegister);
app.use("/", loginRouter);

// Get users
app.get("/login", async (req, res) => {
    const data = await userModel.find();

    res.send({
        msg: "Users Details",
        users: data
    });
});

// Property routes
app.post("/addproperty", checkuser, upload.single("images"), addProperty);
app.get("/property", checkuser, getProperties);
app.delete("/deleteproperty/:id", checkuser, deleteProperty);

// Booking routes
app.post("/bookings", checkuser, addBooking);
app.get("/bookings/:userid", checkuser, getBookingsbyUser);
app.get("/bookings/requests/:sellerid", checkuser, getBookingsbySeller);
app.delete("/bookings/:id", checkuser, deleteBookings);

app.patch("/updatebooking/:id", updateBookingStatus);
app.patch("/confirmbooking/:id", confirmBooking);

// Favorite routes
app.post("/favorites", checkuser, addFavorites);
app.get("/favorites/:id", checkuser, getFavorites);

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
