const express = require("express");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const listings = require("./routes/listings.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRoute = require("./routes/user.js");

const flash = require("connect-flash"); // for flash message(once in a session)

const sessionOptions = {
    secret: "mySuperSecreteCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 1000,
        httpOnly: true, // for cross Scripting Attacks 

    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

const reviews = require("./routes/reviews.js");
// const {listingSchema} = require("/.Schemas.js");
const Review = require("./models/review.js");



app.engine("ejs", ejsMate);

// these the next two lines tells to Express Whenever you are going to redirect somethinng then Go into the views folder 
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

//login



app.get("/login", (req, res) => {
    console.log("LOGIN ROUTE HIT");
    res.render("user/login.ejs");
});

app.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect("/listings");
    }
);

//logout Route 

app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You have been logged out.");
        res.redirect("/");
    });
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRoute)


//Show rout 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    res.render("listings/show.ejs", { listing });
});





//basic api
app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.get("/demouser", async (req, res) => {
    let fakeuser = new User({
        email: "abc@gmail.com",
        username: "abc",
    });

    let registereduser = await User.register(fakeuser, "abcd");
    res.send(registereduser);
})

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