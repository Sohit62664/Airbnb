const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const { isLoggedIn, isOwner } = require("../middleware/auth.js");

const User = require("../models/user.js");



// listing Rout
router.get("/", async (req, res) => {

    const { search, minPrice, maxPrice } = req.query;

    let query = {};

    // Search filter
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }

    // Price filter
    if (minPrice || maxPrice) {

        query.price = {};

        if (minPrice) {
            query.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            query.price.$lte = Number(maxPrice);
        }
    }

    const allListings = await Listing.find(query);

    res.render("listings/index.ejs", {
        allListings,
        search,
        minPrice,
        maxPrice
    });
});

// new Rout creat listing 
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});
//post rout creat listing 
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;

        // Create a searchable location
        const searchLocation =
            `${req.body.listing.location}, ${req.body.listing.country}`;

        // Geocode location
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `q=${encodeURIComponent(searchLocation)}` +
            `&format=jsonv2&limit=1`,
            {
                headers: {
                    "User-Agent": "Wanderlust/1.0"
                }
            }
        );

        const data = await response.json();

        if (data.length > 0) {
            newListing.locationCoordinates = {
                lat: Number(data[0].lat),
                lng: Number(data[0].lon)
            };
        }

        await newListing.save();

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong while creating the listing.");
        res.redirect("/listings/new");
    }
});

//My Listing
router.get("/mine", isLoggedIn, async (req, res) => {
    const myListings = await Listing.find({
        owner: req.user._id
    });

    res.render("listings/myListings.ejs", { myListings });
});

//get favorites Rouute 

router.get("/favorites", isLoggedIn, async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate("favorites");

    res.render("listings/favorites.ejs", {
        favorites: user.favorites
    });
});

//favorite 
router.post("/:id/favorite", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
            favorites: listing._id
        }
    });

    req.flash("success", "Listing added to favorites!");
    res.redirect(`/listings/${id}`);
});


//Delete favorite Route 
router.delete("/:id/favorite", isLoggedIn, async (req, res) => {
    const { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            favorites: id
        }
    });

    req.flash("success", "Listing removed from favorites!");
    res.redirect(`/listings/${id}`);
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