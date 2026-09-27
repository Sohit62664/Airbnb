const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Learn this , how this refrence is Working
        ref: "User" // From where it is getting the user  and how the id is connected to the user 
    }
});

const reviews = mongoose.model("Review", reviewSchema);
module.exports = reviews;