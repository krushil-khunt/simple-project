const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsycn=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

const validateReview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
}

// Reviews in POST route

router.post("/",validateReview,wrapAsycn (async(req,res,next)=>{
    console.log(req.params.id);
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("succes","New Reviews Created");
    res.redirect(`/listing/${listing._id}`)
}));

//Delet Review Route

router.delete("/:reviewId",wrapAsycn(async(req,res)=>{
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("succes","Reviews Delete");
    res.redirect(`/listing/${id}`);
}))

module.exports=router;