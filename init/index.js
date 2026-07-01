const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");

// Connecting Databaces 
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// calling to the main Function 
main().then(()=>{
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}



const initDB = async()=>{
    await Listing.deleteMany();
    await Listing.insertMany(initData.data);
    console.log("Data was Initialized ");
}


initDB();