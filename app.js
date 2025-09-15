const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

const mongurl="mongodb://127.0.0.1:27017/airban";

main()
.then(()=>{
    console.log("✅ connectilon succseyfully...");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongurl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hi hello");
})

app.use("/listing",listings);
app.use("/listing/:id/review",reviews)


app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    let {status=500,message="Something Went Wrong"}=err;
    res.status(status).render("Error.ejs",{message});
    // res.status(status).send(message);
});

app.listen(3000, () => {
    console.log(`✅ Sever is  listening to port 3000`);
});