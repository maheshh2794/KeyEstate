const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    properties: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }],
  },

);


const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;