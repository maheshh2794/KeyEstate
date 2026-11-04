const Favorite = require("../models/favoriteModel");
const Property = require("../models/propertyModel");

const addFavorites = async (req, res) => {
    const { userid, propertyid } = req.body;

    const property = await Property.findById(propertyid);

    if (!property) {
        return res.status(404).send({ msg: "Property not found" });
    }

    const existedFavorite = await Favorite.findOne({
        user: userid,
        properties: propertyid
    });

    if (existedFavorite) {
        await Favorite.findByIdAndUpdate(
            existedFavorite._id,
            { $pull: { properties: propertyid } }
        );

        return res.send({
            msg: "Favorite removed",
            isFavorite: false
        });
    }

    const existedUser = await Favorite.findOne({ user: userid });

    if (existedUser) {
        await Favorite.findByIdAndUpdate(
            existedUser._id,
            { $addToSet: { properties: propertyid } }
        );

        return res.send({
            msg: "Favorite added",
            isFavorite: true
        });
    }

    const newFavorite = new Favorite({
        user: userid,
        properties: [propertyid]
    });

    await newFavorite.save();

    res.send({
        msg: "Favorite created",
        isFavorite: true
    });
};

const getFavorites = async (req, res) => {
    const userid = req.params.id;

    const favorites = await Favorite.findOne({ user: userid });

    if (favorites) {
        return res.send({
            msg: "Favorites sent",
            favorites: favorites.properties
        });
    }

    res.send({
        msg: "No favorites found",
        favorites: []
    });
};

module.exports = { addFavorites, getFavorites };