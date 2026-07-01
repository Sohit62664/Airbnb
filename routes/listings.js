const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");



// listing Rout
router.get("/", async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
})

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});
//post rout
router.post(("/"), async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    // console.log(listing);
    await newlisting.save();
    res.redirect("/listings")
})

// Edit Rout
router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });

});


// Update Route
router.put("/:id", async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listings/${id}`);
});



//Delete Rout
router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});


module.exports = router;
    