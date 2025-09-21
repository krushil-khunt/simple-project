const express=require("express");
const router=express.Router();
const wrapAsycn=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggeIn}=require("../middleware.js")


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
router.get("/new",isLoggeIn,(req,res)=>{
    res.render("listing/new.ejs");
});

//Show rout
router.get("/:id",wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs",{listing})
}));

// create routs
router.post(
    "/",
    isLoggeIn,
    validateListing,
    wrapAsycn (async(req,res,next)=>{
    const newlisting= new Listing(req.body.listing);
    await newlisting.save();
    req.flash("succes","New Listing Created");
    res.redirect("/listing");
}));


// Edit Route
router.get("/:id/edit",isLoggeIn,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{listing});
}));

//Update route
router.put("/:id",isLoggeIn,validateListing,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("succes","Listinh Updated");
    res.redirect(`/listing/${id}`);
}));

//delete route
router.delete("/:id",isLoggeIn,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    let deletlisting=await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    req.flash("succes","Listing Delete");
    res.redirect("/listing");
}));

module.exports=router;