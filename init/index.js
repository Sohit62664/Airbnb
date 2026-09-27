const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const { data } = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
}

const initDB = async () => {

    // Delete old data
    await Listing.deleteMany({});
    await User.deleteMany({});

    // Create one user for each listing
    const users = [];

    for (let i = 1; i <= data.length; i++) {

        const user = new User({
            username: `host${i}`,
            email: `host${i}@example.com`
        });

        const registeredUser = await User.register(
            user,
            "password123"
        );

        users.push(registeredUser);
    }

    // Give each listing its own owner
    const listings = data.map((listing, index) => ({
        ...listing,
        owner: users[index]._id
    }));

    await Listing.insertMany(listings);

    console.log("Database initialized successfully!");
    console.log(`${users.length} users created`);
    console.log(`${listings.length} listings created`);
};

main()
    .then(initDB)
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });