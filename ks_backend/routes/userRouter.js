const express = require("express")
const { addUser, addProperty } = require("../controllers/userController")

const router = express.Router()

router.post("/adduser", addUser)


exports.userRegister = router;