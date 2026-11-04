const express = require("express")
const { authentication } = require("../controllers/authController")

const router = express.Router()

router.post("/login",authentication)

exports.loginRouter = router;