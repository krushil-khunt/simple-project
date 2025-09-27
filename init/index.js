const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongurl="mongodb://127.0.0.1:27017/airban";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongurl);
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"68d7da33d8f59e28bc65dcfd"}))
    await Listing.insertMany(initdata.data);
    console.log("data was innislise");
}
initDB();
