const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsycn=require("../utils/wrapAsync.js");

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

module.exports = router;