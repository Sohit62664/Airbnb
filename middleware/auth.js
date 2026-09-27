const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }

    next();
};


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do that!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to delete this review!");
        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};