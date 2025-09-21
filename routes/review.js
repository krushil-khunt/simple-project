const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsycn=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggeIn,isReviewAuthor}=require("../middleware.js")




// Reviews in POST route

router.post("/",isLoggeIn,validateReview,wrapAsycn (async(req,res,next)=>{
    console.log(req.params.id);
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("succes","New Reviews Created");
    res.redirect(`/listing/${listing._id}`)
}));

//Delet Review Route

router.delete("/:reviewId",isLoggeIn,isReviewAuthor,wrapAsycn(async(req,res)=>{
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("succes","Reviews Delete");
    res.redirect(`/listing/${id}`);
}))

module.exports=router;