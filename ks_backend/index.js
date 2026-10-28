
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const dbconnect = require("./dbconnection/dbConnection");
const { userRegister } = require("./routes/userRouter");
const { loginRouter } = require("./routes/authRouter");

const { addProperty } = require("./controllers/propertyController");
const Property = require("./models/propertyModel");

const {
    addBooking,
    getBookings
} = require("./controllers/bookingController");

dbconnect();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function checkuser(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            msg: "Token is missing. Please log in."
        });
    }

    jwt.verify(token, "secret", (error, decoded) => {
        if (error) {
            return res.status(401).json({
                msg: "Invalid or expired token"
            });
        }

        req.user = decoded;
        next();
    });
}

app.use("/", userRegister);
app.use("/", loginRouter);

app.post("/addproperty", checkuser, addProperty);

app.get("/property", checkuser, async (req, res) => {
    const properties = await Property.find();
    res.status(200).json(properties);
});

app.post("/bookings", checkuser, addBooking);

app.get("/bookings", checkuser, getBookings);

app.listen(4000, () => {
    console.log("Server run in port 4000");
});