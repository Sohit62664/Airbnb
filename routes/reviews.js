

const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");
const Review = require("../models/review");

//Reviews 
// Post Route

router.post("/" , async (req , res)=>{
    let listing = await Listing.findById(req.params.id);
    
    let new_Review = new Review(req.body.review);
    listing.reviews.push(new_Review);
    // listing.reviews.push(new_Review);// debug it

    await new_Review.save();
    await listing.save();

    console.log("new Review saved");
    res.redirect(`/listings/${listing._id}`);
});


router.delete("/:reviewId" , async (req, res)=>{
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id , {$pull :{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
});


module.exports = router ;
