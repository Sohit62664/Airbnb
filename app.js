const express = require("express");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const listings = require("./routes/listings.js");

const reviews = require("./routes/reviews.js");
// const {listingSchema} = require("/.Schemas.js");
const Review = require("./models/review.js");



app.engine("ejs" , ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
// Connecting Databaces 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// calling to the main Function 
main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);









//Show rout 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
})

//new test rout 
// app.get("/testListing" , async (req, res)=>{
//     let sampleListing = new Listing({
//         title: "my villa",
//         description : "By the Beach",
//         price :12000,
//         location:"Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("Sample Was Saved ");
//     res.send("SuccessFull Testing");
// });





//basic api
app.get("/", (req, res) => {
    res.render("home.ejs");
});

//privicy roout 
app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});
//terms rout
app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});
app.listen(8080, () => {
    console.log("Server is listning on port 8080 ");
})