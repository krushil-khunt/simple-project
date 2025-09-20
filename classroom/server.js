const express = require('express');
const app = express();
const users=require("./routs/user.js");
const posts=require("./routs/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOpstin=session({
        secret:"mysuppersecretstring",
        resave:false,
        saveUninitialized:true
    });

app.use(sessionOpstin);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successmsg=req.flash("success");
    res.locals.errormsg=req.flash("erro");
    next();
})

app.get("/register",(req,res)=>{
    let{name="anosoms"}=req.query;
    req.session.name=name;
    
    if(name==="anosoms"){
        req.flash("erro","USer not registrs");
    }else{
        req.flash("success","user register successfully");
    }
    
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    
    res.render("page.ejs",{name:req.session.name});
})


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
    
//     res.send(`you sent a reqest ${req.session.count} time`)

// })

// app.get("/test",(req,res)=>{
//     res.send("test succesuflly!");
// })

app.listen(3000,()=>{
    console.log("server is listing to 3000");
})