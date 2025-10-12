if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

// Use local DB if no Atlas URL is provided
const dbUrl = process.env.MONGOATLAST_URL || "mongodb://127.0.0.1:27017/airban";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({ ...obj,owner: "68dfd3d6fadc53a0a5570db8",}));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

initDB();
