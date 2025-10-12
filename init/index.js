<<<<<<< HEAD
=======
if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

>>>>>>> 55e972f (Initial code of project)
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

<<<<<<< HEAD
const mongurl="mongodb://127.0.0.1:27017/airban";
=======
// const mongurl="mongodb://127.0.0.1:27017/airban";
const dbUrl=process.env.MONGOATLAST_URL;
>>>>>>> 55e972f (Initial code of project)

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
<<<<<<< HEAD
  await mongoose.connect(mongurl);
=======
  await mongoose.connect(dbUrl);
>>>>>>> 55e972f (Initial code of project)
}

const initDB= async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"68d7da33d8f59e28bc65dcfd"}))
    await Listing.insertMany(initdata.data);
    console.log("data was innislise");
}
initDB();
<<<<<<< HEAD
=======



>>>>>>> 55e972f (Initial code of project)
