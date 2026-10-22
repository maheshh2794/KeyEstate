const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")

const dbconnect = require("./dbconnection/dbConnection")
const { userRegister } = require("./routes/userRouter")
const { loginRouter } = require("./routes/authRouter")
const { addProperty } = require("./controllers/userController")
const property = require("./models/propertyModel")
const userModel = require("./models/userModel")



dbconnect()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



function checkuser(req, res, next) {
    const token = req.headers.token

    // Check whether the token exists
    if (!token) {
        return res.status(401).json({
            msg: "Token is missing. Please log in."
        })
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, "secret")
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token"
        })
    }
}


app.use("/", userRegister)

app.use("/", loginRouter)


app.post("/property",)


app.get("/property", checkuser, async (req, res) => {
    try {
        const properties = await property.find()
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching properties",
            error: error.message
        })
    }
})



app.listen(4000, () => {
    console.log("Server run in port 4000")
})