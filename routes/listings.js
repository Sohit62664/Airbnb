const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const { isLoggedIn, isOwner } = require("../middleware/auth.js");



// listing Rout
router.get("/", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
})


// new Rout creat listing 
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});
//post rout creat listing 
router.post("/", isLoggedIn, async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
});

// Edit Rout
router.get("/:id/edit", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });

});


// Update Route
router.put("/:id", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listings/${id}`);
});



//Delete Rout
router.delete("/:id", isLoggedIn, isOwner, async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});


module.exports = router;
