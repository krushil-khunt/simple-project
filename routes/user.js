const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsycn=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/user.js");

router.get("/signup",userController.renderSignupFrom)

router.post("/signup",wrapAsycn(userController.singup));


router.get("/login",userController.renderLoginFrom);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true 
    }),
    userController.login
);

router.get("/logout",userController.logout);

module.exports = router;