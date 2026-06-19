const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listings.js");
const path = require("path");

// Load .env relative to this file's position
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const atlasUrl = process.env.ATLASDB_URL;
const localUrl = "mongodb://127.0.0.1:27017/stayhaven";

async function main() {
    if (atlasUrl) {
        try {
            console.log("Attempting to connect to MongoDB Atlas...");
            await mongoose.connect(atlasUrl);
            console.log("Connected to MongoDB Atlas successfully.");
            return;
        } catch (err) {
            console.log("MongoDB Atlas connection failed. Falling back to local MongoDB...");
        }
    }
    
    // Connect locally
    await mongoose.connect(localUrl);
    console.log("Connected to local MongoDB successfully.");
}

const initDB = async() => {
    try {
        await Listing.deleteMany({});
        // Assigning default owner ID matching your database setup
        initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "69d0b1ce723adeb43f622148" }));
        await Listing.insertMany(initdata.data);
        console.log("Database seeded successfully with stays.");
    } catch(err) {
        console.log("Error seeding database:", err);
    } finally {
        mongoose.disconnect();
    }
};

main().then(() => {
    initDB();
}).catch((err) => {
    console.log("Fatal error in seeding script:", err);
});
