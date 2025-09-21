const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsycn=require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/singup.ejs");
})

router.post("/signup",wrapAsycn(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({email,username});
        const registeruser=await User.register(newuser,password);
        console.log(registeruser);
        req.login(registeruser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("succes","Welcome to Airban");
            res.redirect("/listing");
        })
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
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true 
    }),
    async(req,res)=>{
        req.flash("succes","welcome back to Airban! You are Logged in!"); 
        let  redirectUrl=res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);  
    });

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("succes","you are logged out!")
        res.redirect("/listing")
    })
})
module.exports = router;