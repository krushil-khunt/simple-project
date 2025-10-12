const User=require("../models/user.js");

module.exports.renderSignupFrom=(req,res)=>{
    res.render("users/singup.ejs");
}

module.exports.singup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({email,username});
        const registeruser=await User.register(newuser,password);
        console.log(registeruser);
        req.login(registeruser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Airban");
            res.redirect("/listing");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginFrom=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
        req.flash("success","welcome back to Airban! You are Logged in!"); 
        let  redirectUrl=res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl);  
    };

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!")
        res.redirect("/listing")
    })
}