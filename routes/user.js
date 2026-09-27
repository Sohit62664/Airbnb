const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
})

router.post("/signup", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({
            email,
            username
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "User Registered Successfully");
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

module.exports = router;
