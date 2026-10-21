const mongoose = require("mongoose")

function dbconnect() {
    mongoose.connect("mongodb+srv://dbuser2:Mahesh123@maheshgunda.hpqutwf.mongodb.net/", {
        dbname: "keyestate"
    })
        .then(() => console.log("Mongodb Connected"))
        .catch(err => console.log("Connection Error", err))
}

module.exports = dbconnect;