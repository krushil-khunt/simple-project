const express=require("express");
const router=express.Router();
const wrapAsycn=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggeIn,isOwner,validateListing}=require("../middleware.js");

const listingController= require("../controllers/listing.js");

//index routs
router.get("/",wrapAsycn (listingController.index));

// new Rout
router.get("/new",isLoggeIn,listingController.rendernewfrom);

//Show rout
router.get("/:id",wrapAsycn(listingController.showListing)
);

// create routs
router.post(
    "/",
    isLoggeIn,
    validateListing,
    wrapAsycn (listingController.creatingListing)
);


// Edit Route
router.get("/:id/edit",isOwner,isLoggeIn,wrapAsycn (listingController.renderEditfrom));

//Update route
router.put(
    "/:id",
    isLoggeIn,
    isOwner,
    validateListing,
    wrapAsycn (listingController.updateListing)
);

//delete route
router.delete("/:id",isOwner,isLoggeIn,wrapAsycn (listingController.destoryListing));

module.exports=router;