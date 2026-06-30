const mongoose = require("mongoose");
const URL = require("./models/url");

async function run() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/short-url");

        console.log("DB Connected");

        await URL.deleteMany({});
        console.log("All data deleted");

        await mongoose.disconnect();
    } catch (err) {
        console.log("Error:", err);
    }
}

run();