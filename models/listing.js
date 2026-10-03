const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Creating Schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String,
        default: "https://cdn.confident-group.com/wp-content/uploads/2025/01/09175702/villa-cover.jpg"
    },

    price: {
        type: Number
    },

    location: {
        type: String
    },

    country: {
        type: String
    },

    locationCoordinates: {
        lat: Number,
        lng: Number
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

// Creating model using Schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;