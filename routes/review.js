const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsycn=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggeIn,isReviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/review.js");


// Reviews in POST route

router.post(
    "/",
    isLoggeIn,
    validateReview,
    wrapAsycn (reviewController.createReview)
);

//Delet Review Route

router.delete(
    "/:reviewId",
    isLoggeIn,
    isReviewAuthor,
    wrapAsycn(reviewController.destoryReview)
);

module.exports=router;