const express=require("express");
const router=express.Router();
const wrapAsycn=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggeIn,isOwner,validateListing}=require("../middleware.js");

const listingController= require("../controllers/listing.js");

// index routs & create routs
router
  .route("/")
  .get(wrapAsycn(listingController.index))
  .post(
    isLoggeIn,
    validateListing,
    wrapAsycn(listingController.creatingListing)
  );

// new Rout
router.get("/new",isLoggeIn,listingController.rendernewfrom);  

router.route("/:id")
  .get(wrapAsycn(listingController.showListing))//Show rout
  .put(//Update route
    isLoggeIn,
    isOwner,
    validateListing,
    wrapAsycn (listingController.updateListing))
  .delete(isOwner,isLoggeIn,wrapAsycn (listingController.destoryListing));//delete route

// Edit Route
router.get("/:id/edit",isOwner,isLoggeIn,wrapAsycn (listingController.renderEditfrom));

module.exports=router;