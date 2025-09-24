const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsycn=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.renderSignupFrom)
    .post(wrapAsycn(userController.singup));

router
    .route("/login")
    .get(userController.renderLoginFrom)
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true 
    }),
    userController.login
);

router.get("/logout",userController.logout);

module.exports = router;