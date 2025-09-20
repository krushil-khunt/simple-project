const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsycn=require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/singup.ejs");
})

router.post("/signup",wrapAsycn(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({email,username});
        const registeruser=await User.register(newuser,password);
        console.log(registeruser);
        req.flash("succes","Welcome to Airban");
        res.redirect("/listing");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post(
    "/login",
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true 
    }),
    async(req,res)=>{
        req.flash("succes","welcome back to Airban! You are Logged in!");  
        res.redirect("/listing");  
    });

module.exports = router;