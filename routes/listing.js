const express=require("express");
const router=express.Router();
const wrapAsycn=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");


const validateListing=(req,res,next)=>{
    let {error} =listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
}


//index routs
router.get("/",wrapAsycn (async(req,res,next)=>{
   const alllisitn=await Listing.find({});
   res.render("listing/index.ejs",{alllisitn});
}));

// new Rout
router.get("/new",(req,res)=>{
    res.render("listing/new.ejs");
});

//Shoe rout
router.get("/:id",wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    res.render("listing/show.ejs",{listing})
}));

// create routs
router.post(
    "/",
    validateListing,
    wrapAsycn (async(req,res,next)=>{
    const newlisting= new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listing");
}));


// Edit Route
router.get("/:id/edit",wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
}));

//Update route
router.put("/:id",validateListing,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

//delete route
router.delete("/:id",wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    let deletlisting=await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    res.redirect("/listing");
}));

module.exports=router;