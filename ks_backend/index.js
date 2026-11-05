
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

const {
    addFavorites,
    getFavorites
} = require("./controllers/favoriteController");

const {
    updateProfile
} = require("./controllers/authController");

const userModel = require("./models/userModel");
const upload = require("./middleware/upload");

dbconnect();

const allowedOrigins = [
    "http://localhost:5173",
    "https://key-estate-six.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token", "Authorization"],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// User and login routes
app.use("/", userRegister);
app.use("/", loginRouter);

// Get user details
app.get("/login", async (req, res) => {
    try {
        const data = await userModel.find().select("-password");

        res.send({
            msg: "Users Details",
            users: data
        });
    } catch (error) {
        res.status(500).json({
            msg: "Unable to fetch users",
            error: error.message
        });
    }
});

// Update profile route
app.put("/updateprofile", checkuser, updateProfile);

// Property routes
app.post(
    "/addproperty",
    checkuser,
    upload.array("images", 10),
    addProperty
);

app.get("/property", checkuser, getProperties);

app.delete("/deleteproperty/:id", checkuser, deleteProperty);

// Booking routes
app.post("/bookings", checkuser, addBooking);

app.get("/bookings/:userid", checkuser, getBookingsbyUser);

app.get(
    "/bookings/requests/:sellerid",
    checkuser,
    getBookingsbySeller
);

app.delete("/bookings/:id", checkuser, deleteBookings);

app.patch("/updatebooking/:id", updateBookingStatus);

app.patch("/confirmbooking/:id", confirmBooking);

// Favorites routes
app.post("/favorites", checkuser, addFavorites);

app.get("/favorites/:id", checkuser, getFavorites);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
