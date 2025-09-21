const express=require("express");
const router=express.Router();
const wrapAsycn=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggeIn,isOwner,validateListing}=require("../middleware.js");



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
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    console.log(listing);
    res.render("listing/show.ejs",{listing})
}));

// create routs
router.post(
    "/",
    isLoggeIn,
    validateListing,
    wrapAsycn (async(req,res,next)=>{
    const newlisting= new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    await newlisting.save();
    req.flash("succes","New Listing Created");
    res.redirect("/listing");
}));


// Edit Route
router.get("/:id/edit",isOwner,isLoggeIn,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you equested for dose not exist!");
        return res.redirect("/listing");
    }
    res.render("listing/edit.ejs",{listing});
}));

//Update route
router.put(
    "/:id",
    isLoggeIn,
    isOwner,
    validateListing,
    wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("succes","Listinh Updated");
    res.redirect(`/listing/${id}`);
}));

//delete route
router.delete("/:id",isOwner,isLoggeIn,wrapAsycn (async(req,res,next)=>{
    let {id}=req.params;
    let deletlisting=await Listing.findByIdAndDelete(id);
    console.log(deletlisting);
    req.flash("succes","Listing Delete");
    res.redirect("/listing");
}));

module.exports=router;